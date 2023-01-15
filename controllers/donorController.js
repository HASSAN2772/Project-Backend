const mongoose = require("mongoose");
const DonorUser = require("../Models/donorUserModel");
module.exports.donateBlood = async (req, res) => {
  const { name, cnic, phone, address, age, blood, city } = req.body;
  console.log("errors", req.body);
  const donateBloodRequest = new DonorUser({
    name: name,
    cnic: cnic,
    city: city,
    blood: blood,
    donorAge: age,
    phoneNo: phone,
    donorAddress: address,
  });
  const { errors } = await donateBloodRequest.save();
  console.log("errors", errors);
  if (errors) {
    res.status(400).json({
      success: false,
      errors,
    });
  } else {
    res.status(200).json({
      success: true,
    });
  }
};

module.exports.getDonors = async (req, res) => {
  const getTotalDonors = await DonorUser.count();

  return res.status(200).json({
    success: true,
    getTotalDonors,
  });
};

module.exports.getAllDonors = async (req, res) => {
  const getyDonorUsers = await DonorUser.find();

  return res.status(200).json({
    success: true,
    getyDonorUsers,
  });
};

module.exports.getSingleDonor = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const getSingleDonor = await DonorUser.findById({ _id: id });

    // console.log(getAllUserData)
    res.status(200).json({
      success: true,
      getSingleDonor,
    });
  } catch (err) {
    res.status(402).json({
      err,
    });
    console.log(err);
  }
};

module.exports.updateBloodStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const updateBloodStatus = await DonorUser.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    console.log(updateBloodStatus);
    res.status(200).json({
      success: true,
      message: "Status Updated Successfully",
      updateBloodStatus,
    });
  } catch (err) {
    console.log(err);
  }
};
module.exports.deleteSingleDonor = async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    console.log(id);
    const deleteSingleDonor = await DonorUser.findByIdAndDelete({ _id: id });
    // console.log(getAllUserData)
    res.status(200).json({
      success: true,
      message: "user deleted successfully",
      deleteSingleDonor,
    });
  } catch (err) {
    res.status(402).json({
      err,
    });
    console.log(err);
  }
};
