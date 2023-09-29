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
router.patch("/:sid", reserveSelectedseats);

router.post("/", createShow);

export default router;
