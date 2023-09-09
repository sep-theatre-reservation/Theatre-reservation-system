import mongoose from "mongoose";

const Schema = mongoose.Schema;

const guestSchema = new Schema({
  email: { type: String, required: true, unique: true },

  bookings: [{ type: mongoose.Types.ObjectId, required: true, ref: "Booking" }],
});

const Guest = mongoose.model("Guest", guestSchema);
export default Guest;
