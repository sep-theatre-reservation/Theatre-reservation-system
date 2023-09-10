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


export const getBookingById = async (req, res, next) => {
  const bookingId = req.params.bid;
  console.log(bookingId)
  let booking;
  try {
    booking = await Booking.findById(bookingId).populate({
      path: 'show',
      populate: {
        path: 'theatre',
      }
    })

  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a booking",
      500
    );
    return next(error);
  }

  if (!booking) {
    const error = new HttpError("No booking exist for given id.", 404);
    return next(error);
  }
  res.json({ booking: booking.toObject({ getters: true }) });
}

export const updateBookingStatus = async (req, res, next) => {
  const bookingId=req.params.bid
  const { status } = req.body;


  let booking;

  try {
    booking = await Booking.findById(bookingId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, cannot get booking by id",
      500
    );
    return next(error);
  }

  booking.status=status

  try {
    await booking.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, updating status failed",
      500
    );
    return next(error);
  }
  res.status(200).json({ booking: booking.toObject({ getters: true }) });

}

export const getBookings = () => { }
