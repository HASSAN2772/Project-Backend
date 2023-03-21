const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const router = require("./Routes/userRoutes");
const mongodb = require("./Database/database");
const dotenv = require("dotenv");
const path = require("path");
require("dotenv").config();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// importing  routes
app.use("/api/v1", router);

app.listen(process.env.PORT, () => {
  console.log(`Server is Listening on Port ${process.env.PORT}`);
});
