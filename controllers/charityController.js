const mongoose = require("mongoose");
const Charity = require("../Models/CharityModel")

module.exports.charity = async (req, res) => {

  console.log(req.body)
  const { name, cardName, cvv, longCard, charityAmount, phoneNo } = req.body
  if(!name && !cardName && !cvv && !longCard && !charityAmount && !phoneNo)
  {
    res.status(204).json({
      message:"Invalid fields "
    })
  }
  else{
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
}

module.exports.numberCharityDonors = async(req,res)=>
{
  const numberCharityDonors =  await Charity.count()
  
   return res.status(200).json({
    success:true,
    numberCharityDonors,

  })

}

module.exports.getCharityDonors = async(req,res)=>
{
  const getCharityDonors =  await Charity.find()
  
   return res.status(200).json({
    success:true,
    getCharityDonors,

  })

}