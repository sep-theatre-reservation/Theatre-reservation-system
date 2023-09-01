import express from "express";
import {
  getSlides,
  createSlide,
  deleteSlide,
} from "../controllers/carousel-controllers.js";

const router = express.Router();

router.get("/", getSlides);
router.post("/", createSlide);
router.delete("/:sid", deleteSlide);

export default router;
