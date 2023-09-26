import { validationResult } from "express-validator";
import HttpError from "../models/http-error.js";
import Show from "../models/show.js";
import Theatre from "../models/theatre.js";
import Booking from "../models/booking.js";
import User from "../models/user.js";
import mongoose from "mongoose";

function generateArray(rows, columns) {
  const result = [];
  const startCharCode = "A".charCodeAt(0);

  for (let i = 0; i < rows; i++) {
    for (let j = 1; j <= columns; j++) {
      const letter = String.fromCharCode(startCharCode + i);
      result.push(`${letter}${j}`);
    }
  }
  return result;
}

export const createShow = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data", 422)
    );
  }

  const { movie, theatre, showtime } = req.body;

  let showTheatre;
  try {
    showTheatre = await Theatre.findById(theatre);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, adding theatre failed",
      500
    );
    return next(error);
  }
  const seatIds = generateArray(showTheatre.rows, showTheatre.cols);
  const showSeats = seatIds.map((seat) => ({ id: seat, availability: true }));

  const createdShow = new Show({
    movie,
    theatre,
    showtime,
    showSeats,
  });

  try {
    await createdShow.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, adding theatre failed",
      500
    );
    return next(error);
  }
  // console.log("test");
  // console.log(createShow);
  res.status(201).json({ show: createdShow });
};

export const getShowsByMovieId = async (req, res, next) => {
  const movieId = req.params.mid;
  let shows;
  // Get the current date and time
  const currentDate = new Date();
  try {
    shows = await Show.find({
      movie: movieId,
      showtime: { $gte: currentDate },
    }).populate("theatre");
  } catch (err) {
    const error = new HttpError("Fetching shows failed, try again", 500);
    return next(error);
  }

  res.json({ shows: shows.map((show) => show.toObject({ getters: true })) });
};

export const getShowById = async (req, res, next) => {
  const showId = req.params.sid;

  let show;

  try {
    show = await Show.findById(showId).populate("theatre");
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, reserving seats failed",
      500
    );
    return next(error);
  }

  res.json({ show: show.toObject({ getters: true }) });
};

export const reserveSelectedseats = async (req, res, next) => {
  const { selectedSeats, user } = req.body;

  let userObj;
  if (user) {
    try {
      userObj = await User.findById(user);
    } catch (err) {
      next(err);
    }
  }

  const showId = req.params.sid;

  let session;

  try {
    // Start a MongoDB transaction
    session = await mongoose.startSession();
    session.startTransaction();

    const show = await Show.findById(showId).session(session);

    if (!show) {
      session.endSession();
      const error = new HttpError("Show not found", 404);
      return next(error);
    }

    const showSeats = show.showSeats;

    // Validate if any selected seat is already unavailable
    const unavailableSeats = selectedSeats.filter((seatId) => {
      const seat = showSeats.find((s) => s.id === seatId);
      return seat && !seat.availability;
    });

    if (unavailableSeats.length > 0) {
      const error = new HttpError(
        "Oops!..At least one of the selected seats are no longer available, please select again.",
        400 // Use a 400 Bad Request status code to indicate client error
      );
      return next(error);
    }

    // Update the availability of seats
    const updatedSeats = showSeats.map((seat) => {
      if (selectedSeats.includes(seat.id)) {
        return { ...seat, availability: false };
      }
      return seat;
    });

    show.showSeats = updatedSeats;
    await show.save({ session }); // Save the changes within the transaction

    // Create a new Booking document
    const newBooking = new Booking({
      show: showId,
      seats: selectedSeats,
      user: user,
    });

    await newBooking.save({ session });
    if (user) {
      userObj.bookings.push(newBooking);
      await userObj.save();
    }

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    // Send the booking ID in the response
    res.status(200).json({
      show: show.toObject({ getters: true }),
      bookingId: newBooking._id,
    });
  } catch (err) {
    // Handle errors and roll back the transaction on failure
    if (session) {
      await session.abortTransaction();
      session.endSession();
    }

    next(err);
  }
};
