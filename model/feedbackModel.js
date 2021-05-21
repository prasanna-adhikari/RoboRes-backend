const mongoose = require("mongoose");
const Feedback = mongoose.Schema({
  name: {
    type: String,
    require,
  },
  sub: {
    type: String,
    require,
  },
  desc: {
    type: String,
    require,
  },
});
module.exports = mongoose.model("Feedback", Feedback);
