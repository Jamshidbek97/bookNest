import mongoose, { Schema } from "mongoose";
import { MemberStatus, MemberType } from "../libs/types/enums/member.enum";

const memberSchema = new Schema(
  {
    memberType: {
      type: String,
      enum: MemberType,
      default: MemberType.USER,
    },
    memberStatus: {
      type: String,
      enum: MemberStatus,
      default: MemberStatus.ACTIVE,
    },
    memberNick: {
      type: String,
      index: { unique: true, sparse: true },
      required: true,
      trim: true,
    },
    memberPhone: {
      type: String,
      index: { unique: true, sparse: true },
      trim: true,
    },
    memberEmail: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    memberPassword: {
      type: String,
      select: false,
      required: true,
    },
    memberAddress: {
      type: String,
      trim: true,
    },
    memberDesc: {
      type: String,
      trim: true,
    },
    memberImage: {
      type: String,
    },
    memberPoints: {
      type: Number,
      default: 0,
      min: 0,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      select: false,
    },
  },
  { timestamps: true }
);

memberSchema.pre("validate", function (next) {
  if (!this.memberPhone && !this.memberEmail) {
    this.invalidate("memberPhone", "Either phone number or email is required.");
    this.invalidate("memberEmail", "Either email or phone number is required.");
  }
  next();
});

export default mongoose.model("Member", memberSchema);
