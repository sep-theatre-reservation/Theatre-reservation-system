import express from "express";
import { findUserByEmail } from "../controllers/users-controllers.js";

const router = express.Router();

router.post("/", findUserByEmail);
export default router;
