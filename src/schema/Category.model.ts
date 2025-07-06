import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
});
export default mongoose.model("Category", categorySchema);
