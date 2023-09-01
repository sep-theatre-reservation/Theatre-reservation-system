import { validationResult } from "express-validator";
import HttpError from "../models/http-error.js";
import Carousel from "../models/carousel.js";

export const getSlides = async (req, res, next) => {
  let slides;
  try {
    slides = await Carousel.find({});
  } catch (err) {
    const error = new HttpError(
      "Fetching slides failed, please try again later",
      500
    );
    return next(error);
  }
  res.json({
    slides: slides.map((slide) => slide.toObject({ getters: true })),
  });
};

export const createSlide = async (req, res, next) => {
  const { imgUrl } = req.body;

  const createdSlide = new Carousel({
    imgUrl,
  });
  try {
    await createdSlide.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, creating slide failed",
      500
    );
    return next(error);
  }

  res.status(201).json({ slide: createdSlide });
};

export const deleteSlide = async (req, res, next) => {
  const slideId = req.params.sid;

  try {
    await Carousel.findByIdAndDelete(slideId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not remove slide.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Slide Deleted!.." });
};
