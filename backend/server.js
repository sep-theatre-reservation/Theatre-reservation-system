import express from "express";
import bodyParser from "body-parser";
import movieRoutes from "./routes/movies-routes.js";
import HttpError from "./models/http-error.js";
import theatreRoutes from "./routes/theatres-routes.js";
import carouselRoutes from "./routes/carousel-router.js";
import connectDB from "./config/db.js";
import { config } from "dotenv";
config()

const port=process.env.PORT||3000
connectDB()

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

app.listen(port, () => {
  console.log(`server started on port ${port}`);
})

// const uri =
//   "mongodb+srv://user:user@cluster0.aapg2bb.mongodb.net/mernapp";

//const uri = "mongodb+srv://Anushna:6n5cAEtqbgeOeDP9@cluster0.1cddrqz.mongodb.net/?retryWrites=true&w=majority"

// mongoose
//   .connect(uri)
//   .then(() => {
//     app.listen(3000, () => {
//       console.log("Server is running on port 3000");
//     });
//   })
//   .catch((err) => {
//     console.error("Error connecting to MongoDB:", err);
//   });

