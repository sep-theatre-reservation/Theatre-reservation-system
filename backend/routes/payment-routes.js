import express from "express";
import { addPayment } from "../controllers/payment-controller.js";

const router = express.Router();

router.post("/", addPayment);

export default router;
