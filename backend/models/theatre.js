import mongoose from "mongoose";

const Schema = mongoose.Schema;

const theatreSchema = new Schema({
  theatreName: { type: String, required: true },
  rows: { type: Number, required: true },
  cols: { type: Number, required: true },
  ticketPrice:{type:Number, default:250}
});

const Theatre = mongoose.model("Theatre", theatreSchema);
export default Theatre;
