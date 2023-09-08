import mongoose from "mongoose";

const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  booking: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" },
  dateTime: { type: Date, required: true },
  amount: { type: Number, required: true }, //calculate amount using booking seats and price from theatre model( apply promotions as well)
});

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
