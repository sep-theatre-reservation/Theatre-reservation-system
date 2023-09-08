import { sendEmail } from "../utilites/nodemailer.js";
import express from "express";

const router =express.Router()

router.post("/",sendEmail)

export default router;