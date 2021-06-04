const mongoose = require("mongoose");
const bookingSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CustomerRegister",
    required: true,
  },
  // user: {
  //   type: String,
  // },
  table_no: { type: Number, ref: "Table", required: true },
  // table_no: {
  //   type: [{ type: Number, ref: "Table" }],
  //   required: true,
  // },
  people: {
    type: Number,
  },
  booking_date: {
    type: String,
  },
  cancel_time: {
    type: String,
  },
});
module.exports = mongoose.model("Booking", bookingSchema);
