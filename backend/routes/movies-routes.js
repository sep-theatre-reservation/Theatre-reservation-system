import express from "express";
import {
  getMovies,
  searchMovies,
  getShowingMovies,
  getUpcomingMovies,
  getMovieById,
  createMovie,
  updateMovieStatus,
} from "../controllers/movies-controllers.js";
import checkAuth from "../middleware/check-auth.js";

const router = express.Router();

router.get("/", getMovies);
router.get("/search", searchMovies);
router.get("/nowShowing", getShowingMovies);
router.get("/comingSoon", getUpcomingMovies);
router.get("/:mid", getMovieById);

router.use(checkAuth);

router.post("/", createMovie);
router.patch("/:mid", updateMovieStatus);

export default router;
