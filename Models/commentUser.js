const mongoose = require("mongoose");
const validator = require("validator");
const { default: isEmail } = require("validator/lib/isEmail");
const userCommentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
    maxLenght: [200, "Comments cannot contains more than 200 letters"],
  },
});

module.exports = mongoose.model("UserComment", userCommentSchema);
