import express from "express";
import {
  getMovies,
  getShowingMovies,
  getUpcomingMovies,
  getMovieById,
  createMovie,
  updateMovieStatus,
} from "../controllers/movies-controllers.js";

const router = express.Router();

router.get("/", getMovies);
router.get("/nowShowing", getShowingMovies);
router.get("/comingSoon", getUpcomingMovies);
router.post("/", createMovie);
router.get("/:mid", getMovieById);
router.patch("/:mid", updateMovieStatus);

export default router;
