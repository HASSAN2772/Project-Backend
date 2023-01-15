const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  cnic: {
    type: Number,
  },
  city: {
    type: String,
  },
  blood: {
    type: String,
  },
  donorAge: {
    type: Number,
  },
  phoneNo: {
    type: Number,
  },
  donorAddress: {
    type: String,
  },
  bloodStatus: {
    type: String,
    default: "Not Recieved",
  },
});

module.exports = mongoose.model("DonorUser", donorSchema);
