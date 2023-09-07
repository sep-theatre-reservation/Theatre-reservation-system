import express from "express";
import bodyParser from "body-parser";
import movieRoutes from "./routes/movies-routes.js";
import HttpError from "./models/http-error.js";
import theatreRoutes from "./routes/theatres-routes.js";
import carouselRoutes from "./routes/carousel-router.js";
import promotionRoutes from "./routes/promotions-routes.js";
import connectDB from "./config/db.js";
import usersRoutes from "./routes/users-routes.js";
import showsRoutes from "./routes/shows-routes.js";
import bookingRoutes from "./routes/booking-routes.js"
import orders from "./routes/paypalPayment-routes.js"
import { config } from "dotenv";
import cors from "cors"
config();

const port = process.env.PORT || 3000;
connectDB();

const app = express();
// app.use(cors({
//   origin: 'http://localhost:5173',
// }));
app.options('/orders/:orderID/capture', cors());
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
app.use("/api/promotions", promotionRoutes);
app.use("/api/carousel", carouselRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/shows", showsRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/orders",orders)

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
});
