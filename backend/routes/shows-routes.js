import express from "express";

import {
  createShow,
  reserveSelectedseats,
  getShowsByMovieId,
  getShowById,
} from "../controllers/shows-controllers.js";

const router = express.Router();

router.get("/movie/:mid", getShowsByMovieId);
router.get("/:sid", getShowById);

router.post("/", createShow);
router.patch("/:sid", reserveSelectedseats);

export default router;
