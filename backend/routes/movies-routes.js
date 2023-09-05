import express from "express";
import {
  getMovies,
  getMovieById,
  createMovie,
} from "../controllers/movies-controllers.js";

const router = express.Router();

router.get("/", getMovies);
router.post("/", createMovie);
router.get("/:mid", getMovieById);

export default router;
