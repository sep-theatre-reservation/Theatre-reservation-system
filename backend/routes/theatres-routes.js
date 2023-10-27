import express from "express";
import {
  addTheatre,
  getTheatres,
  deleteTheatre,
  editTheatreShowtimes,
  getTheatreShowtimes
} from "../controllers/theatres-controllers.js";

import checkAuth from "../middleware/check-auth.js";

const router = express.Router();

router.get("/", getTheatres);

router.get("/showtimes/:tid", getTheatreShowtimes);

router.use(checkAuth);

router.post("/", addTheatre);

router.delete("/:tid", deleteTheatre);

router.post("/showtimes/:tid", editTheatreShowtimes);

export default router;
