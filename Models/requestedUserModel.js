const mongoose = require("mongoose");

const requestedSchema = new mongoose.Schema({
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
        
    }, requesterAge:{
        type:Number,
        required:true,
        maxLenght:[200,"Age No Cannot exceed more than 200 years numbers"],
        minLenght:[18,"Age No Cannot less than 18 years numbers"]

        
    }, phoneNo:{
        type:Number,
        required:true,
        
    },
    requesterAddress:{
        type:String,
        required:true,
        
    },

})

const RequestedUser = new mongoose.model("RequestedUser",requestedSchema)

module.exports = {
    RequestedUser
}