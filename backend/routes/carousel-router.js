import express from "express";
import {
  getSlides,
  createSlide,
  deleteSlide,
} from "../controllers/carousel-controllers.js";
import checkAuth from "../middleware/check-auth.js";

const router = express.Router();
router.get("/", getSlides);
router.use(checkAuth)
router.post("/", createSlide);
router.delete("/:sid", deleteSlide);

export default router;
