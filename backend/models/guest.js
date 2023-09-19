import mongoose from "mongoose";

const Schema = mongoose.Schema;

const guestSchema = new Schema({
  email: { type: String },
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }],
});

const Guest = mongoose.model("Guest", guestSchema);
export default Guest;
