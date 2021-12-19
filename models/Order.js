const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    products: [
      {
        productName: { type: String },
        quantity: { type: Number, default: 1 },
      },
    ],

    time: { type: Date },
    name: { type: String },
    phone: { type: String },
    nameSender: { type: String },
    phoneSender: { type: String },
    address: { type: String },
    deliveryCost: { type: Number },
    total: { type: Number },
    status: { type: String, default: "pendiente" },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
