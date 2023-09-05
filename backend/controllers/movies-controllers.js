import { validationResult } from "express-validator";
import HttpError from "../models/http-error.js";
import Movie from "../models/movie.js";

export const getMovies = async (req, res, next) => {
  let movies;
  try {
    movies = await Movie.find({});
  } catch (err) {
    const error = new HttpError(
      "Fetching movies failed, please try again later",
      500
    );
    return next(error);
  }
  res.json({
    movies: movies.map((movie) => movie.toObject({ getters: true })),
  });
};

export const getMovieById = async (req, res, next) => {
  const movieId = req.params.mid;

  let movie;
  try {
    movie = await Movie.findById(movieId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a movie",
      500
    );
    return next(error);
  }

  if (!movie) {
    const error = new HttpError("No movie exist for given id.", 404);
    return next(error);
  }

  res.json({ movie: movie.toObject({ getters: true }) });
};

export const createMovie = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const {
    title,
    release_date,
    poster_url,
    trailerLink,
    description,
    director,
    cast,
  } = req.body;

  const createdMovie = new Movie({
    title,
    release_date,
    poster_url,
    trailerLink,
    description,
    director,
    cast,
  });
  try {
    await createdMovie.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, creating movie failed",
      500
    );
    return next(error);
  }

  res.status(201).json({ movie: createdMovie });
};
