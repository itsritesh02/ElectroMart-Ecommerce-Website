import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    // ==========================
    // PRODUCT NAME
    // ==========================

    name: {
      type: String,
      required: true,
      trim: true,
    },

    // ==========================
    // PRICE
    // ==========================

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    // ==========================
    // CATEGORY
    // ==========================

    category: {
      type: String,
      required: true,
      trim: true,
    },

    // ==========================
    // DESCRIPTION
    // ==========================

    description: {
      type: String,
      required: true,
      trim: true,
    },

    // ==========================
    // PRODUCT IMAGE
    // ==========================

    image: {
      type: String,
      required: true,
      trim: true,
    },

    // ==========================
    // RATING
    // ==========================

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
  },
  {
    timestamps: true,
  },
);

// ==========================
// EXPORT MODEL
// ==========================

const Product = mongoose.model("Product", productSchema);

export default Product;
