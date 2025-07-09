import {
  ProductCategory,
  ProductFormat,
  ProductStatus,
  Language,
  ProductCondition,
} from "../libs/types/enums/book.enum";
import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    productStatus: {
      type: String,
      enum: Object.values(ProductStatus),
      default: ProductStatus.AVAILABLE,
    },

    productCategory: {
      type: String,
      enum: Object.values(ProductCategory),
      required: true,
    },

    productName: {
      type: String,
      required: true,
    },

    productAuthor: {
      type: String,
      required: true,
    },

    productPrice: {
      type: Number,
      required: true,
    },

    productStockCount: {
      type: Number,
      required: true,
      default: 0,
    },

    productFormat: {
      type: String,
      enum: Object.values(ProductFormat),
      default: ProductFormat.PAPERBACK,
    },

    productVolume: {
      type: Number,
      default: 1,
    },

    productCondition: {
      type: String,
      enum: Object.values(ProductCondition),
      default: ProductCondition.NEW,
    },

    productLanguage: {
      type: String,
      enum: Object.values(Language),
      default: Language.ENGLISH,
    },

    productDescription: {
      type: String,
      default: "",
    },

    productImages: {
      type: [String],
      default: [],
    },

    productViews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

productSchema.index(
  { productName: 1, productAuthor: 1, productFormat: 1, productVolume: 1 },
  { unique: true }
);

export default mongoose.model("Product", productSchema);
