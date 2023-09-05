import mongoose from "mongoose";

const Schema =mongoose.Schema;

const promotionSchema = new Schema({
    promotionTitle:{type:String, required: true},
    description:{type:String, required: true},
    imageUrl:{type:String, required: true},
})

const Promotion = mongoose.model("Promotion",promotionSchema);
export default Promotion;