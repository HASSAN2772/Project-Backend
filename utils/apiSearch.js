const mongoose = require("mongoose");
const RequestedUser = require("../Models/requestedUserModel");

module.exports.searchApp = async (req, res) => {
  const cusId = req.params.key;
  try {
    const chechRequestApp = await RequestedUser.find({ cnic: cusId });
    if (!chechRequestApp) {
      return res.status(244).json({
        success: false,
        chechRequestApp,
        message: "Request Not Found",
      });
    }
    res.status(200).json({
      success: true,
      chechRequestApp,
      message: "Requester Status",
    });
  } catch (err) {
    console.log(err);
  }
};
