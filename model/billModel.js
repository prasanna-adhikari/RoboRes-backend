const mongoose = require("mongoose");
const billSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CustomerRegister",
      required: true,
    },
    orderItem: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Items",
          required: true,
        },
        quantity: { type: Number },
        total: { type: Number },
      },
    ],
    grandTotal: { type: Number },
  },
  { timestamps: true }
);
module.exports = mongoose.model("bill", billSchema);
