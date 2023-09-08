import { handleCaptureOrder,handleCreateOrder } from "../controllers/paypalPayment-controller.js";
import express from "express";
import cors from 'cors'
const router =express.Router()

router.post("/",handleCreateOrder);
router.post("/:orderID/capture",handleCaptureOrder);
// router.options('/orders/:orderID/capture', cors()); //if Cors error occurs, uncomment

export default router;
