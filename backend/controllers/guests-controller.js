import { validationResult } from "express-validator";
import HttpError from "../models/http-error.js";

import Guest from "../models/guest.js";

export const addGuest = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { email, bookingId } = req.body;

  let guest;
  try {
    guest = await Guest.findOne({ email }).populate("bookings");
  } catch (error) {
    console.error("Error fetching guest by email:", error);
    throw error;
  }

  if (!guest) {
    guest = new Guest({ email });
  }
  guest.bookings.push(bookingId)
  
  try {
    await guest.save();
  } catch (err) {
    console.log(err)
    const error = new HttpError(
      "Something went wrong, adding guest failed",
      500
    );
    return next(error);
  }
  res.status(201).json({ guest: guest });

};

export const findGuestById = async (req, res, next) => {
  /* */
};
