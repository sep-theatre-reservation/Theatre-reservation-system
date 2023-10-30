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

  if (!req.userData.isAdmin) {
    const error = new HttpError(
      "You do not have permission to perform this action",
      403
    );
    return next(error);
  }

  const { theatreName, rows, cols, ticketPrice } = req.body;

  const addedTheatre = new Theatre({ theatreName, rows, cols, ticketPrice });
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
  if (!req.userData.isAdmin) {
    const error = new HttpError(
      "You do not have permission to perform this action",
      403
    );
    return next(error);
  }
  const theatreId = req.params.tid;

  try {
    await Theatre.findByIdAndDelete(theatreId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not remove theatre.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Theatre Deleted!.." });
};

export const getTheatreShowtimes = async (req, res, next) => {

  const theatreId = req.params.tid;

  try {
    const theatre = await Theatre.findById(theatreId);
    res.json({showtimes: theatre.showtimes});
    
  }catch (error) {
    next(error);
  }

};

export const editTheatreShowtimes = async (req, res, next) => {
  // Check if the user is an admin
  if (!req.userData.isAdmin) {
    const error = new HttpError(
      "You do not have permission to perform this action",
      403
    );
    return next(error);
  }
  
  const theatreId = req.params.tid;
  const newShowtimes = req.body.showtimes; 

  try {
    const theatre = await Theatre.findById(theatreId);

    // Update the showtimes array with the new array
    theatre.showtimes = newShowtimes;

    // Save the updated theater document
    await theatre.save();

    res.json({ message: "Showtimes updated successfully" });

  } catch (error) {
    next(error);
  }
};

