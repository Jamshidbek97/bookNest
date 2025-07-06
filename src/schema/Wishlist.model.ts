import mongoose, { Schema } from "mongoose";

const wishlistSchema = new Schema({
  member: { type: Schema.Types.ObjectId, ref: "Member", required: true },
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});
export default mongoose.model("Wishlist", wishlistSchema);
