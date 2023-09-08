import express from "express";
import {
  getBookingById,
  createBooking,
  getBookings,
} from "../controllers/booking-controller.js";
import checkAuth from "../middleware/check-auth.js";

const router = express.Router();

router.get("/", getBookings);
router.get("/:bid", getBookingById);
//router.use(checkAuth);
router.post("/", createBooking);

export default router;
