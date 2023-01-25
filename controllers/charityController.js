const mongoose = require("mongoose");
const Charity = require("../Models/CharityModel");

module.exports.charity = async (req, res) => {
  console.log(req.body.name);

  const { name, cardName, cvv, longCard, charityAmount, phoneNo } = req.body;
  if (!name && !cardName && !cvv && !longCard && !charityAmount && !phoneNo) {
    res.status(204).json({
      message: "Invalid fields ",
    });
  } else {
    const charityData = new Charity({
      name: req.body.name,
      cardName: req.body.cardName,
      cvv: req.body.cvv,
      longCard: req.body.longCard,
      donate: req.body.donateAmount,
      phone: req.body.phone,
    });

    charityData.save((error, result) => {
      if (error) {
        console.log(error);
        res.status(400).json({
          error: error,
        });
      } else {
        console.log(result);
        res.status(200).json({
          success: true,
        });
      }
    });
  }
};

module.exports.numberCharityDonors = async (req, res) => {
  const numberCharityDonors = await Charity.count();

  return res.status(200).json({
    success: true,
    numberCharityDonors,
  });
};

module.exports.getCharityDonors = async (req, res) => {
  const getCharityDonors = await Charity.find();

  return res.status(200).json({
    success: true,
    getCharityDonors,
  });
};
module.exports.deleteSingleCharity = async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    // var {id} = new ObjectId(req.params.Id);

    console.log(id);
    const deleteSingleCharity = await Charity.findByIdAndDelete({ _id: id });
    // console.log(getAllUserData)
    res.status(200).json({
      success: true,
      message: "user deleted successfully",
      // deleteSingleCharity,
    });
  } catch (err) {
    res.status(402).json({
      err,
    });
    console.log(err);
  }
};
module.exports.getSingleCharityUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const getSingleCharityUser = await Charity.findById({ _id: id });

    // console.log(getAllUserData)
    res.status(200).json({
      success: true,
      getSingleCharityUser,
    });
  } catch (err) {
    res.status(402).json({
      err,
    });
    console.log(err);
  }
};
