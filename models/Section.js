const mongoose = require("mongoose");

const SectionSchema = new mongoose.Schema(
  {
    title: { type: String },
    subtitle: { type: String },
    description: { type: String },
    img: { type: String },
    linkText: { type: String },
    link: { type: String },
    order: { type: Number, default: 1000 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Section", SectionSchema);
