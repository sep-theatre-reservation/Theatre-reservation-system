import express from "express";
import {getBookingById,createBooking,getBookings} from "../controllers/booking-controller.js";
import checkAuth from "../middleware/check-auth.js";

const router = express.Router();

router.get("/", getBookings);
// router.use(checkAuth);
router.post("/", createBooking);
router.get("/:bid", getBookingById);

export default router;
