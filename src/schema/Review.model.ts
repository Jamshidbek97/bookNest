import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  member: { type: Schema.Types.ObjectId, ref: "Member", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now },
});
export default mongoose.model("Review", reviewSchema);
