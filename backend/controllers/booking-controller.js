import { validationResult } from "express-validator";
import HttpError from "../models/http-error.js";

import Booking from "../models/booking.js";
import Show from "../models/show.js";
import moment from "moment";
import mongoose from "mongoose";

export const createBooking = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { show, seats, user, guest, status } = req.body;

  const addedBooking = new Booking({ show, seats, user, guest, status });

  try {
    await addedBooking.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, adding booking failed",
      500
    );
    return next(error);
  }
  res.status(201).json({ booking: addedBooking });
};

export const getBookingById = async (req, res, next) => {
  const bookingId = req.params.bid;
  let booking;
  try {
    booking = await Booking.findById(bookingId).populate({
      path: "show",
      populate: {
        path: "theatre",
      },
    });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a booking",
      500
    );
    return next(error);
  }

  if (!booking) {
    const error = new HttpError("No booking exist for given id.", 404);
    return next(error);
  }
  res.json({ booking: booking.toObject({ getters: true }) });
};

export const updateBookingStatus = async (req, res, next) => {
  const bookingId = req.params.bid;
  const { status } = req.body;

  let booking;

  if (status == "Cancelled") {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Find the booking by ID and mark it as "Cancelled"
      booking = await Booking.findByIdAndUpdate(
        bookingId,
        { status: "Cancelled" },
        { new: true, session }
      );

      // Update seat availability in the corresponding show
      const show = await Show.findById(booking.show).session(session);
      for (const seat of booking.seats) {
        const seatIndex = show.showSeats.findIndex((s) => s.id === seat);
        if (seatIndex !== -1) {
          show.showSeats[seatIndex].availability = true;
        }
      }

      await show.save({ session });
      await session.commitTransaction();
      session.endSession();

      //console.log("Booking has been cancelled, and seats are now available.");
    } catch (err) {
      await session.abortTransaction();
      session.endSession();
      const error = new HttpError(
        "Something went wrong, cancellation failed",
        500
      );
      return next(error);
    }
  } else {
    try {
      booking = await Booking.findById(bookingId);
    } catch (err) {
      const error = new HttpError(
        "Something went wrong, cannot get booking by id",
        500
      );
      return next(error);
    }

    booking.status = status;

    try {
      await booking.save();
    } catch (err) {
      const error = new HttpError(
        "Something went wrong, updating status failed",
        500
      );
      return next(error);
    }
  }
  res.status(200).json({ booking: booking.toObject({ getters: true }) });
};

export const getBookingsByUser = async (req, res, next) => {
  const userId = req.params.uid;

  let bookings;
  try {
    bookings = await Booking.find({ user: userId }).populate({
      path: "show",
      populate: [
        { path: "movie", model: "Movie" },
        { path: "theatre", model: "Theatre", select: "theatreName" },
      ],
    });

    // Manually sort by showtime in descending order (ISO string format)
    bookings.sort((a, b) => {
      const dateA = Date.parse(a.show.showtime);
      const dateB = Date.parse(b.show.showtime);
      return dateB - dateA;
    });

    const formattedBookings = bookings.map((booking) => ({
      id: booking._id,
      status: booking.status,
      date: booking.show.showtime,
      movie: booking.show.movie.title,
      seats: booking.seats,
      theatre: booking.show.theatre.theatreName,
    }));

    res.json({ bookings: formattedBookings });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a bookings",
      500
    );
    return next(error);
  }
};

export const getDailyBookingCountByTitle = async (req, res, next) => {
  try {
    // Define the date range for today
    const todayStart = moment().startOf("day"); // Midnight
    const todayEnd = moment().endOf("day"); // 11:59:59 PM

    const bookingCounts = await Booking.aggregate([
      {
        $match: {
          bookingTime: {
            $gte: todayStart.toDate(),
            $lte: todayEnd.toDate(),
          },
        },
      },
      {
        $lookup: {
          from: "shows", // Assuming the collection name for shows is 'shows'
          localField: "show",
          foreignField: "_id",
          as: "show",
        },
      },
      {
        $unwind: "$show",
      },
      {
        $lookup: {
          from: "movies", // Assuming the collection name for movies is 'movies'
          localField: "show.movie",
          foreignField: "_id",
          as: "movie",
        },
      },
      {
        $unwind: "$movie",
      },
      {
        $group: {
          _id: "$movie.title",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0, // Exclude _id from results
          movie: "$_id",
          count: 1,
        },
      },
    ]);

    res.json({ dailyBookingCounts: bookingCounts });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not get daily booking counts",
      500
    );
    return next(error);
  }
};

export const getRevenuuePastWeek = async (req, res, next) => {
  try {
    // Calculate the date 7 days ago from the current date
    const sevenDaysAgo = moment().subtract(7, "days");

    // Use MongoDB aggregation to group income by day
    const result = await Booking.aggregate([
      {
        $match: {
          bookingTime: { $gte: sevenDaysAgo.toDate() },
        },
      },
      {
        $lookup: {
          from: "show", // Assuming the collection name for shows is 'shows'
          localField: "show",
          foreignField: "_id",
          as: "show",
        },
      },
      {
        $unwind: "$show",
      },
      {
        $lookup: {
          from: "theatre", // Assuming the collection name for theatres is 'theatres'
          localField: "show.theatre",
          foreignField: "_id",
          as: "theatre",
        },
      },
      {
        $unwind: "$theatre",
      },
      {
        $group: {
          _id: {
            year: { $year: "$bookingTime" },
            month: { $month: "$bookingTime" },
            day: { $dayOfMonth: "$bookingTime" },
          },
          totalIncome: {
            $sum: {
              $multiply: [{ $size: "$seats" }, "$theatre.ticketPrice"],
            },
          },
        },
      },
    ]);

    res.json({ incomeByDay: result });
  } catch (error) {
    const httpError = new HttpError(
      "Something went wrong while fetching revenue for the past week.",
      500
    );
    return next(httpError);
  }
};
