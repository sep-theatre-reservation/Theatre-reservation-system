import express from "express";
import {
  addPromotion,
  getPromotions,
  deletePromotion,
} from "../controllers/promotion-controllers.js";
import checkAuth from "../middleware/check-auth.js";

const router = express.Router();

router.get("/", getPromotions);
router.use(checkAuth)
router.post("/", addPromotion);
router.delete("/:tid", deletePromotion);

export default router;
