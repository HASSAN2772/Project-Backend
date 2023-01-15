const mongoose = require("mongoose");
require("dotenv").config();

const mongodb = mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: "true",
    useUnifiedTopology: "true",
  })
  .catch((error) => {
    console.log(error);
  })
  .then((res) => {
    console.log("Database Connected Successfully");
  });

module.exports = mongodb;
