const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Items = mongoose.Schema({
  itemName: {
    type: String,
  },
  itemCategory: {
    type: String,
  },
  itemPrice: {
    type: Number,
  },
  itemImage: {
    type: String,
  },
});
module.exports = mongoose.model("Items", Items);
