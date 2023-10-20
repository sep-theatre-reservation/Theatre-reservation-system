import jwt from "jsonwebtoken";
import HttpError from "../models/http-error.js";

export default (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error("You do not have permission to perform this action");
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = { isAdmin: decodedToken.role === "Admin" };
    next();
  } catch (err) {
    const error = new HttpError(
      "You do not have permission to perform this action",
      403
    );
    return next(error);
  }
};
