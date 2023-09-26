import express from "express";
import {
  getBookingById,
  createBooking,
  getBookingsByUser,
  updateBookingStatus,
} from "../controllers/booking-controller.js";
import checkAuth from "../middleware/check-auth.js";

const router = express.Router();

router.get("/:bid", getBookingById);
router.get("/user/:uid", getBookingsByUser);
router.post("/", createBooking);
router.patch("/:bid", updateBookingStatus);
export default router;
