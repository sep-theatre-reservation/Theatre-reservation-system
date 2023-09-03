import { validationResult } from "express-validator";
import HttpError from "../models/http-error.js";
import Promotion from "../models/promotion.js";

export const addPromotion = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  console.log(req.body)
  const { promotionTitle, description, imageUrl } = req.body;

  const addedPromotion = new Promotion({ promotionTitle, description, imageUrl });
  try {
    await addedPromotion.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, adding promotion failed",
      500
    );
    return next(error);
  }
  res.status(201).json({ promotion: addedPromotion });
};

export const getPromotions = async (req, res, next) => {
  let promotions;
  try {
    promotions = await Promotion.find({});
  } catch (err) {
    const error = new HttpError(
      "Fetching promotions failed, please try again later",
      500
    );
    return next(error);
  }
  res.json({
    promotions: promotions.map((promotion) => promotion.toObject({ getters: true })),
  });
};

export const deletePromotion = async (req, res, next) => {
  const promotionId = req.params.tid;

  try {
    await Promotion.findByIdAndDelete(promotionId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not remove Promotion.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Promotion Deleted!.." });
};
