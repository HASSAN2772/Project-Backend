const mongoose = require("mongoose");
const Charity = require("../Models/CharityModel")

module.exports.charity = async (req, res) => {

  console.log(req.body)
  const { name, cardName, cvv, longCard, charityAmount, phoneNo } = req.body
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
    }
    else {
      console.log(result);
    }
  })
  res.status(200).json({
    success: true,
    charityData
  })
}

module.exports.numberCharityDonors = async(req,res)=>
{
  const numberCharityDonors =  await Charity.count()
  
   return res.status(200).json({
    success:true,
    numberCharityDonors,

  })

}
module.exports.CharityDonors = async(req,res)=>
{
  const charityDonors =  await Charity.count()
  
   return res.status(200).json({
    success:true,
    charityDonors,

  })

}