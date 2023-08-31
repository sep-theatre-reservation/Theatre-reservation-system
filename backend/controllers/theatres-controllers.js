import { validationResult } from "express-validator";
import HttpError from "../models/http-error.js";

import Theatre from "../models/theatre.js";

export const addTheatre = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { theatreName, rows, cols } = req.body;

  const addedTheatre = new Theatre({ theatreName, rows, cols });
  try {
    await addedTheatre.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, adding theatre failed",
      500
    );
    return next(error);
  }
  res.status(201).json({ theatre: addedTheatre });
};

export const getTheatres = async (req, res, next) => {
  let theatres;
  try {
    theatres = await Theatre.find({});
  } catch (err) {
    const error = new HttpError(
      "Fetching theatres failed, please try again later",
      500
    );
    return next(error);
  }
  res.json({
    theatres: theatres.map((theatre) => theatre.toObject({ getters: true })),
  });
};

export const deleteTheatre = async (req, res, next) => {
  const theatreId = req.params.pid;

  let theatre;
  try {
    await Theatre.findByIdAndRemove(theatreId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not remove theatre.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Theatre Deleted!.." });
};
