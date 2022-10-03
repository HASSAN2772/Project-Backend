const mongoose =  require("mongoose");
const validator = require("validator")
const { default: isEmail } = require("validator/lib/isEmail")
const Userschema = new mongoose.Schema({

    name:{
        type:String,
        required:true,

    },
    lastName:{
        type:String,
        required:true,
    },email:{
        type:String,
        required:true,
        
    },password:{
        type:String,
        required:true,
    },
}) 

module.exports =  mongoose.model("User",Userschema)
