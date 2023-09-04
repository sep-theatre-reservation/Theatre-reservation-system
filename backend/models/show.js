import mongoose from "mongoose";

const Schema = mongoose.Schema;

const showSeats = new Schema({
  id: String,
  availability: Boolean,
});

const showSchema = new Schema({
  movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" },
  theatre: { type: mongoose.Schema.Types.ObjectId, ref: "Theatre" },
  showtime: { type: Date, required: true },
  showSeats: [showSeats],
});

const Show = mongoose.model("Show", showSchema);
export default Show;
