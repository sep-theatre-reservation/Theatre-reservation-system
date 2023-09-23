import mongoose from "mongoose";

const Schema = mongoose.Schema;

const carouselSchema = new Schema({
  title:{type:String,required:true},
  imgUrl: { type: String, required: true },
});

const Carousel = mongoose.model("Carousel", carouselSchema);
export default Carousel;
