import express from "express";
import {
  addTheatre,
  getTheatres,
  deleteTheatre,
} from "../controllers/theatres-controllers.js";

import checkAuth from "../middleware/check-auth.js";

const router = express.Router();

router.get("/", getTheatres);

router.use(checkAuth);

router.post("/", addTheatre);

router.delete("/:tid", deleteTheatre);

export default router;
