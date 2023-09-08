import { validationResult } from "express-validator";
import HttpError from "../models/http-error.js";

import Booking from "../models/booking.js";

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

export const getBookingById = () => {};

export const getBookings = () => {};
