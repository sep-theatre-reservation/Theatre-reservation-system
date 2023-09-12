import { validationResult } from "express-validator";
import HttpError from "../models/http-error.js";
import Payment from "../models/payment.js";

export const addPayment = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { booking,paypalPayment } = req.body;

  const addedPayment = new Payment({ booking,paypalPayment });

  try {
    await addedPayment.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, adding payment failed",
      500
    );
    return next(error);
  }
  res.status(201).json({ payment: addedPayment });
};


