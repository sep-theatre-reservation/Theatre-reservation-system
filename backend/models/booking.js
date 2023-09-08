import mongoose from "mongoose";

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  show: { type: mongoose.Types.ObjectId, required: true, ref: "Show" },
  // seats: [{ type: String, required: true }],
  // // UserID (Foreign Key, nullable) - For registered users
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  // },
  // // GuestID (Foreign Key, nullable) - For guest users
  // guest: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Guest",
  // },
  // status: {
  //   type: String,
  //   enum: ["Pending", "Confirmed", "Cancelled"],
  //   default: "Pending",
  //   required: true,
  // },
});

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;

