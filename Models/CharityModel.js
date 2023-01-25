const mongoose = require("mongoose");
const express = require("express");

//Have also tried Schema.Types.ObjectId, mongoose.ObjectId

const charitySchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  cardName: {
    required: true,
    type: String,
  },
  cvv: {
    required: true,
    type: Number,
    maxLenght: [3, "Cvv cannot exceed 3 digits"],
    minLenght: [3, "Cvv Should be having 3 digits"],
  },
  longCard: {
    required: true,
    type: Number,
    maxLenght: [16, "Card No cannot exceed 16 digits"],
    minLenght: [16, "Card No Should be having 16 digits"],
  },
  donate: {
    required: true,
    type: Number,
  },
  phone: {
    required: true,
    type: Number,
    maxLenght: [11, "Phone No cannot exceed 11 digits"],
    minLenght: [11, "Phone No Should be having 11 digits"],
  },
  date: { type: Date, default: new Date().getTime() },
});

module.exports = mongoose.model("Charity", charitySchema);
