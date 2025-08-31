import mongoose, { Schema } from "mongoose";
import { LikeGroup } from "../libs/types/enums/like.enum";

const likeSchema = new Schema(
  {
    likeGroup: {
      type: String,
      enum: Object.values(LikeGroup),
      required: true,
    },

    memberId: {
      type: Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },

    likeRefId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

likeSchema.index({ likeGroup: 1, memberId: 1, likeRefId: 1 }, { unique: true });

export default mongoose.model("Like", likeSchema);
