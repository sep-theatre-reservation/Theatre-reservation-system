import express from "express";
import {getMovieById,createMovie} from "../controllers/movies-controllers.js"

const router = express.Router();

router.get("/:mid",getMovieById);
router.post("/", createMovie);

export default router;
