const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomerRegister = mongoose.Schema({
  name: {
    type: String,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  dob: {
    type: String,
    default: "update your dob",
  },
  email: {
    type: String,
    default: "update your email",
  },
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  profile: {
    type: String,
    default: "pictures/no-image.png",
  },
  role: {
    type: String,
    enum: ["Admin", "Billing", "Customer"],
    default: "Customer",
  },
});
module.exports = mongoose.model("CustomerRegister", CustomerRegister);
