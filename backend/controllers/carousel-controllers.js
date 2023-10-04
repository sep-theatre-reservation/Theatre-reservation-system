import { validationResult } from "express-validator";
import HttpError from "../models/http-error.js";
import Carousel from "../models/carousel.js";

import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

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
  const { title, imgUrl } = req.body;

  const s3 = new S3Client({
    region: "ap-south-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_ID,
      secretAccessKey: process.env.AWS_SECRET_KEY,
    },
  });

  // Generate a unique key for the S3 object (you can use a library like `uuid`)
  const key = `${uuidv4()}.jpg`;

  const createdSlide = new Carousel({
    title,
    imgUrl: `https://images-for-mern.s3.amazonaws.com/${key}`,
  });
  try {
    // Download the image from provided URL
    const imageResponse = await axios.get(imgUrl, {
      responseType: "arraybuffer",
    });

    // Upload the image to S3 using AWS SDK v3
    const uploadParams = {
      Bucket: "images-for-mern",
      Key: key,
      Body: imageResponse.data,
      ContentType: "image/jpeg", // Adjust based on the image type
    };

    await s3.send(new PutObjectCommand(uploadParams));

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
