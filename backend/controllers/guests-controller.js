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

  const { email } = req.body;

  const addedGuest = new Guest({ email });
  try {
    await addedGuest.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, adding theatre failed",
      500
    );
    return next(error);
  }
  res.status(201).json({ guest: addedGuest });
};

export const findGuestById = async (req, res, next) => {
  /* */
};
