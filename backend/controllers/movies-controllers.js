import { validationResult } from "express-validator";
import HttpError from "../models/http-error.js";
import Movie from "../models/movie.js";

import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

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
  //console.log(movies.length);
  res.json({
    movies: movies.map((movie) => movie.toObject({ getters: true })),
  });
};

export const searchMovies = async (req, res, next) => {
  const query = req.query.query;

  let movies;
  try {
    movies = await Movie.find({ title: { $regex: query, $options: "i" } });
  } catch (err) {
    const error = new HttpError(
      "Fetching movies failed, please try again later",
      500
    );
    return next(error);
  }
  //console.log(movies.length);
  res.json({
    movies: movies.map((movie) => movie.toObject({ getters: true })),
  });
};

export const getShowingMovies = async (req, res, next) => {
  let movies;
  try {
    movies = await Movie.find({ status: "nowShowing" });
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

export const getUpcomingMovies = async (req, res, next) => {
  let movies;
  try {
    movies = await Movie.find({ status: "comingSoon" });
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

  const s3 = new S3Client({
    region: "ap-south-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_ID,
      secretAccessKey: process.env.AWS_SECRET_KEY,
    },
  });

  // Generate a unique key for the S3 object (you can use a library like `uuid`)
  const keyPoster = `${uuidv4()}.jpg`;
  const keyDirector = `${uuidv4()}.jpg`;
  const keyCast1 = `${uuidv4()}.jpg`;
  const keyCast2 = `${uuidv4()}.jpg`;
  const keyCast3 = `${uuidv4()}.jpg`;
  const keyCast4 = `${uuidv4()}.jpg`;

  const createdMovie = new Movie({
    title,
    release_date,
    poster_url: `https://images-for-mern.s3.amazonaws.com/${keyPoster}`,
    trailerLink,
    description,
    director: {
      ...director,
      imageUrl: `https://images-for-mern.s3.amazonaws.com/${keyDirector}`,
    },
    cast: [
      {
        ...cast[0],
        imageUrl: `https://images-for-mern.s3.amazonaws.com/${keyCast1}`,
      },
      {
        ...cast[1],
        imageUrl: `https://images-for-mern.s3.amazonaws.com/${keyCast2}`,
      },
      {
        ...cast[2],
        imageUrl: `https://images-for-mern.s3.amazonaws.com/${keyCast3}`,
      },
      {
        ...cast[3],
        imageUrl: `https://images-for-mern.s3.amazonaws.com/${keyCast4}`,
      },
    ],
  });
  try {
    // Download the images from provided URLs
    const imageResponsePoster = await axios.get(poster_url, {
      responseType: "arraybuffer",
    });

    const imageResponseDirector = await axios.get(director.imageUrl, {
      responseType: "arraybuffer",
    });

    const imageResponseCast1 = await axios.get(cast[0].imageUrl, {
      responseType: "arraybuffer",
    });
    const imageResponseCast2 = await axios.get(cast[1].imageUrl, {
      responseType: "arraybuffer",
    });
    const imageResponseCast3 = await axios.get(cast[2].imageUrl, {
      responseType: "arraybuffer",
    });
    const imageResponseCast4 = await axios.get(cast[3].imageUrl, {
      responseType: "arraybuffer",
    });

    // Upload the images to S3 using AWS SDK v3
    const uploadParamsPoster = {
      Bucket: "images-for-mern",
      Key: keyPoster,
      Body: imageResponsePoster.data,
      ContentType: "image/jpeg", // Adjust based on the image type
    };
    const uploadParamsDirector = {
      Bucket: "images-for-mern",
      Key: keyDirector,
      Body: imageResponseDirector.data,
      ContentType: "image/jpeg", // Adjust based on the image type
    };
    const uploadParamsCast1 = {
      Bucket: "images-for-mern",
      Key: keyCast1,
      Body: imageResponseCast1.data,
      ContentType: "image/jpeg", // Adjust based on the image type
    };
    const uploadParamsCast2 = {
      Bucket: "images-for-mern",
      Key: keyCast2,
      Body: imageResponseCast2.data,
      ContentType: "image/jpeg", // Adjust based on the image type
    };
    const uploadParamsCast3 = {
      Bucket: "images-for-mern",
      Key: keyCast3,
      Body: imageResponseCast3.data,
      ContentType: "image/jpeg", // Adjust based on the image type
    };
    const uploadParamsCast4 = {
      Bucket: "images-for-mern",
      Key: keyCast4,
      Body: imageResponseCast4.data,
      ContentType: "image/jpeg", // Adjust based on the image type
    };

    await s3.send(new PutObjectCommand(uploadParamsPoster));
    await s3.send(new PutObjectCommand(uploadParamsDirector));
    await s3.send(new PutObjectCommand(uploadParamsCast1));
    await s3.send(new PutObjectCommand(uploadParamsCast2));
    await s3.send(new PutObjectCommand(uploadParamsCast3));
    await s3.send(new PutObjectCommand(uploadParamsCast4));

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

export const updateMovieStatus = async (req, res, next) => {
  const movieId = req.params.mid;
  const { status } = req.body;
  //console.log(status);

  let movie;
  try {
    movie = await Movie.findById(movieId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, cannot get booking by id",
      500
    );
    return next(error);
  }
  movie.status = status;
  try {
    await movie.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, updating status failed",
      500
    );
    return next(error);
  }
  res.status(200).json({ movie: movie.toObject({ getters: true }) });
};
