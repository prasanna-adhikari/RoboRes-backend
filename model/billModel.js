const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const billSchema = new Schema({
  items: [{ itemName: String, itemPrice: Number, quantity: Number }],
  totalPrice: Number,
  paid: Number,
  date: String,
});

module.exports = mongoose.model("Bill", billSchema);
