import express from "express";
import {
  getBookingById,
  createBooking,
  getBookings,
  updateBookingStatus
} from "../controllers/booking-controller.js";
import checkAuth from "../middleware/check-auth.js";

const router = express.Router();

router.get("/", getBookings);
router.post("/", createBooking);
router.get("/:bid", getBookingById);
router.patch("/:bid",updateBookingStatus)
export default router;
