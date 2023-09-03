import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  role: {
    type: String,
    enum: ["Admin", "Customer"],
    default: "Customer", // Default role is "Customer"
  },
  bookings: [{ type: mongoose.Types.ObjectId, required: true, ref: "Booking" }],
});

const User = mongoose.model("User", userSchema);
export default User;
