const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    img: { type: String },
    categories: { type: Array },
    price: { type: Number },
    size1: { type: String },
    price1: { type: Number },
    size2: { type: String },
    price2: { type: Number },
    size3: { type: String },
    price3: { type: Number },

    inStock: { type: Boolean, default: true },
    showOnGallery: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
