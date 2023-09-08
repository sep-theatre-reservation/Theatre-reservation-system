import mongoose from "mongoose";

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  show: { type: mongoose.Types.ObjectId, required: true, ref: "Show" },
  seats: [{ type: String, required: true }],
  customer: { type: mongoose.Types.ObjectId, ref: "User" },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Cancelled"],
    required: true,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
