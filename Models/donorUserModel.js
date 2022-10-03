const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        
    }, cnic:{
        type:Number,
        required:true,
        maxLenght:[13,"Cnic Cannot exceeed 13 Numbers"],
        minLenght:[13,"Cnic shoud be 13 Numbers"]

        
    }, city:{
        type:String,
        required:true,
        
    }, blood:{
        type:String,
        required:true,
        
    }, donorAge:{
        type:Number,
        required:true,
        maxLenght:[200,"Age No Cannot exceed more than 200 years numbers"],
        minLenght:[18,"Age No Cannot less than 18 years numbers"]

        
    }, phoneNo:{
        type:Number,
        required:true,
        
    },
    donorAddress:{
        type:String,
        required:true,
        
    },

})

const DonorUser = new mongoose.model("DonorUser",donorSchema)

module.exports = {
    DonorUser
}