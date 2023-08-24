const mongoose = require("mongoose");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const Movie = require("../models/movie");

const getMovieById = async (req, res, next) => {
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

const createMovie = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { title, release_date } = req.body;

  const createdMovie = new Movie({
    title,
    release_date,
    poster_url: "https://pbs.twimg.com/media/FvUVt3hXgAAxP1H.jpg",
    director: {
      name: "Christopher Nolan",
      img: "https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcQfhx2z_xQoCdczKH0SS_Kt31aHFKp7Mr_uIM1UYFQiEKNwXlzs5NddxoKQ86f3nDrnGmkP-lnxk3yA8dA",
    },
    cast: [
      {
        name: "Cillian Murphy",
        img: "https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcQZIuXgDofNrOab8XnYOJ6ge3aFm1BEKitpuFPdgSdSgV49UE91EySMXgBwtS6xJBY-LoiS8OS0ziOzDY0",
      },
      {
        name: "Florence Pugh",
        img: "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcTxfRKH-zYlvwZAENxe-rPB4XdLUWHOs09hPGuPzrsSsOH9WuFdDekaQ9rIBgugAir6pqsZ9WfUuHCqY2c",
      },
    ],
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

exports.getMovieById = getMovieById;
exports.createMovie = createMovie;
