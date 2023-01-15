const mongoose = require("mongoose");
const validator = require("validator");
const { default: isEmail } = require("validator/lib/isEmail");
const Userschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  comment: {
    type: Number,
    required: true,
    maxLenght: [8, "max length cannot EXCEED 8"],
  },
});

module.exports = mongoose.model("Test", Userschema);
