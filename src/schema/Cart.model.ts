import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema({
  member: { type: Schema.Types.ObjectId, ref: "Member", required: true },
  items: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true, min: 1 },
    },
  ],
  updatedAt: { type: Date, default: Date.now },
});
export default mongoose.model("Cart", cartSchema);
