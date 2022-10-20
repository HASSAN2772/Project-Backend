const mongoose = require("mongoose");

const requestedSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        
    }, cnic:{
        type:Number,
        required:true,
   
        
    }, city:{
        type:String,
        required:true,
        
    }, blood:{
        type:String,
        required:true,
        
    }, requesterAge:{
        type:Number,
        required:true,
        
    }, phoneNo:{
        type:Number,
        required:true,
    },
    requesterAddress:{
        type:String,
        required:true,
    },
    ApplicationStatus :{
        type:String,
        default:"Pending"
    }

})

module.exports =  mongoose.model("RequestedUser",requestedSchema)


