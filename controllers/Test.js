const mongoose = require("mongoose");
const Test = require("../Models/test")

module.exports.TestData = async (req, res) => {

    res.status(200).send("Home")
}
