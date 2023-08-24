const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const movvieRoutes = require("./routes/movies-routes");
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());

app.use("/api/movies", movvieRoutes);

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

mongoose
  .connect(
    "mongodb+srv://Anushna:6n5cAEtqbgeOeDP9@cluster0.1cddrqz.mongodb.net/sep?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5001, () => {
      console.log("Server is running on port 5001");
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
