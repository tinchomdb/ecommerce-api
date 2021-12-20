const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    text: { type: String },
    author: { type: String },
    order: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
