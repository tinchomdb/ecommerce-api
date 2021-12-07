const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    products: [
      {
        productId: { type: String },
        quantity: { type: Number, default: 1 },
      },
    ],

    deliveryTime: { type: Object, required: true },
    senderName: { type: String },
    senderPhone: { type: String },
    receiverName: { type: String },
    receiverPhone: { type: String },
    receiverAddress: { type: Object },

    status: { type: String, default: "pending" },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
