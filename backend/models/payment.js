import mongoose from "mongoose";

const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  paypalPayment:{type: mongoose.Schema.Types.Mixed,default:{}},
  booking: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" },
});

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
