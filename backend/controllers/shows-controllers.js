import { validationResult } from "express-validator";
import HttpError from "../models/http-error.js";
import Show from "../models/show.js";
import Theatre from "../models/theatre.js";

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

  res.status(201).json({ show: createdShow });
};

export const getShowsByMovieId = async (req, res, next) => {
  const movieId = req.params.mid;
  let shows;

  try {
    shows = await Show.find({ movie: movieId }).populate("theatre");
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
  const { selectedSeats } = req.body;

  const showId = req.params.sid;

  let show;

  try {
    show = await Show.findById(showId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, reserving seats failed",
      500
    );
    return next(error);
  }

  const showSeats = show.showSeats;
  const updatedSeats = showSeats.map((seat) => {
    if (selectedSeats.includes(seat.id)) {
      return { ...seat, availability: false };
    }
    return seat;
  });

  show.showSeats = updatedSeats;
  try {
    await show.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, reserving seats failed",
      500
    );
    return next(error);
  }
  res.status(200).json({ show: show.toObject({ getters: true }) });
};
