import {
  BookGenre,
  BookFormat,
  BookStatus,
} from "../libs/types/enums/book.enum";
import mongoose, { Schema } from "mongoose";

// schema first, code first

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    author: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: BookStatus,
      default: BookStatus.PAUSE,
    },

    genre: {
      type: String,
      enum: BookGenre,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    stockCount: {
      type: Number,
      required: true,
    },

    format: {
      type: String,
      enum: BookFormat,
      default: BookFormat.HARDCOVER,
    },

    timesBorrowed: {
      type: Number,
    },

    pageCount: {
      type: Number,
    },

    description: {
      type: String,
    },

    coverImages: {
      type: [String],
      default: [],
    },

    BookViews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

bookSchema.index({ title: 1, author: 1, genre: 1 }, { unique: true });

export default mongoose.model("Book", bookSchema);
