const mongoose = require("mongoose");
const RequestedUser = require("../Models/requestedUserModel")

module.exports.requestBloodUser = async (req, res) => {
    const { name, cnic, phone, address, age, blood, city } = req.body
    const bloodRequest = new RequestedUser({
        name:req.body.name,
        cnic:req.body.cnic,
        city:req.body.city,
        blood:req.body.blood,
        requesterAge:req.body.age,
        phoneNo:req.body.phone,
        requesterAddress:req.body.address
    
    })
    bloodRequest.save((error,result)=>
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
        bloodRequest
       
    })
}

module.exports.numberRequestedBloood = async(req,res)=>
{
  const numberRequestedBloood =  await RequestedUser.count()
  
   return res.status(200).json({
    success:true,
    numberRequestedBloood,

  })

}

module.exports.getRequestedBlood = async(req,res)=>
{
  const getRequestedBlood =  await RequestedUser.find()
  
   return res.status(200).json({
    success:true,
    getRequestedBlood,

  })

}

module.exports.getSingleRequester = async(req,res)=>
{
    try{
        const {id} = req.params
        console.log(id)
        const getSingleRequester = await RequestedUser.findById({_id:id});

        // console.log(getAllUserData)
        res.status(200).json({
            success:true,
            getSingleRequester,
        })
    }
    catch(err)
    {
        res.status(402).json({
            err
        })
console.log(err)
    }
}

module.exports.updateRequesterStatus = async(req,res)=>
{
  try
  { 
    const {id} = req.params;
    const updateRequesterStatus = await RequestedUser.findByIdAndUpdate(id,req.body,
      {
        new:true
      });
    console.log(updateRequesterStatus)
    res.status(200).json({
      success:true,
      message:"Status Updated Successfully",
      updateRequesterStatus,
    })
  }
  catch(err)
  {
    console.log(err)
  }
}