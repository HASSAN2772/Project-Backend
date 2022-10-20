const mongoose = require("mongoose");
const DonorUser = require("../Models/donorUserModel")
module.exports.donateBlood = async (req, res) => {
    const { name, cnic, phone, address, age, blood, city } = req.body
    const donateBloodRequest = new DonorUser({
        name:req.body.name,
        cnic:req.body.cnic,
        city:req.body.city,
        blood:req.body.blood,
        donorAge:req.body.age,
        phoneNo:req.body.phone,
        donorAddress:req.body.address
    
    })
    donateBloodRequest.save((error,result)=>
    {
        if(error)
        {
            console.log(error)
        }
        else
        {
            console.log(result)
        }
    })

    res.status(200).json({
        success:true,
        donateBloodRequest
       
    })
}

module.exports.getDonors = async(req,res)=>
{
  const getTotalDonors =  await DonorUser.count()
  
   return res.status(200).json({
    success:true,
    getTotalDonors,

  })

}

module.exports.getAllDonors = async(req,res)=>
{
  const getyDonorUsers =  await DonorUser.find()
  
   return res.status(200).json({
    success:true,
    getyDonorUsers,

  })

}