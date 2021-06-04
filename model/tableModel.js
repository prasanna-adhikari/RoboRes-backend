const mongoose = require("mongoose");
const tableSchema = mongoose.Schema({
  table_no: {
    type: Number,
    trim: true,
  },
  capacity: {
    type: Number,
    trim: true,
  },
  status: {
    type: [
      {
        type: String,
      },
    ],
    enum: ["Free", "Booked", "Packed"],
    default: ["Free"],
  },
});
module.exports = mongoose.model("Table", tableSchema);
