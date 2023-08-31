import express from "express";
import {
  addTheatre,
  getTheatres,
  deleteTheatre,
} from "../controllers/theatres-controllers.js";

const router = express.Router();

router.get("/", getTheatres);
router.post("/", addTheatre);
router.delete("/:tid", deleteTheatre);

export default router;
