import express from "express";
import { addGuest } from "../controllers/guests-controller.js";

const router = express.Router();

router.post("/", addGuest);

export default router;
