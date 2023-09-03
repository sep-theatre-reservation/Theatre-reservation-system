import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import movieRoutes from "./routes/movies-routes.js";
import HttpError from "./models/http-error.js";
import theatreRoutes from "./routes/theatres-routes.js";
import carouselRoutes from "./routes/carousel-router.js";
import usersRoutes from "./routes/users-routes.js";

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.use("/api/movies", movieRoutes);
app.use("/api/theatres", theatreRoutes);
app.use("/api/carousel", carouselRoutes);
app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured!.." });
});

const uri =
  "mongodb+srv://ashashipriya:ne7rAGwdHsicdr91@cluster0.zkwkqs7.mongodb.net/?retryWrites=true&w=majority";

// const uri =
//   "mongodb+srv://Anushna:6n5cAEtqbgeOeDP9@cluster0.1cddrqz.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(uri)
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
