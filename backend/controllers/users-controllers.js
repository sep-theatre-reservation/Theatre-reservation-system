import { validationResult } from "express-validator";
import HttpError from "../models/http-error.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

const registerUser = async (email) => {
  const newUser = new User({ email: email, bookings: [] });
  let savedUser;
  try {
    savedUser = await newUser.save();
  } catch (err) {
    throw new HttpError("Registration failed.", 500);
  }
  return savedUser;
};

export const findUserByEmail = async (req, res, next) => {
  const { email } = req.body;
  let registeredUser;
  try {
    registeredUser = await User.findOne({ email: email });
  } catch (err) {
    return next(new HttpError("Authentication failed.", 500));
  }
  if (!registeredUser) {
    try {
      registeredUser = await registerUser(email);
    } catch (err) {
      return next(new HttpError("Registration failed.", 500));
    }
  }
  const isAdmin = registeredUser.role === "Admin";
  let token;
  try {
    token = jwt.sign(
      { email: registeredUser.email, role: registeredUser.role },
      "SEP_theatre_reservation",
      { expiresIn: "1h" }
    );
  } catch (err) {
    return next(new HttpError("Authentication failed.", 500));
  }
  res.json({ isAdmin: isAdmin, token: token });
};
