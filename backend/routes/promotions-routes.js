import express from "express";
import {
  addPromotion,
  getPromotions,
  deletePromotion,
} from "../controllers/promotion-controllers.js";

const router = express.Router();

router.get("/", getPromotions);
router.post("/", addPromotion);
router.delete("/:tid", deletePromotion);

export default router;
