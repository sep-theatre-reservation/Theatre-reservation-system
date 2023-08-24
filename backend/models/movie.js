import mongoose from "mongoose";

const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: { type: String, required: true },
  release_date: { type: Date, required: true },
  poster_url: { type: String, required: true },
  director: {
    name: { type: String, required: true },
    img: { type: String, required: true },
  },
  cast: [
    {
      name: { type: String, required: true },
      img: { type: String, required: true },
    },
  ],
});

const Movie = mongoose.model("Movie", movieSchema);
export default Movie;