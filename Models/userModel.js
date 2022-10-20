const mongoose =  require("mongoose");
const validator = require("validator")
const { default: isEmail } = require("validator/lib/isEmail")
const bcrypt =  require("bcryptjs")
const jwt = require("jsonwebtoken")


const Userschema = new mongoose.Schema({

    firstName:{
        type:String,
        required:true,

    },
    lastName:{
        type:String,
        required:true,
    },email:{
        type:String,
        required:true,
        unique:true,
        
    },password:{
        type:String,
        required:true,
    },cpassword:{
        type:String,
        required:true,
    },
    role: { type: String, default: 'user' },
    resetPasswordToken: String,

}) 

Userschema.pre('save', async function(next) {
    
    if(!this.isModified('password')) {
        next();

    }
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.cpassword, 12); 
});

// genetaing tokens

Userschema.methods.generateUserToken = function()
{
    return jwt.sign({id: this._id},process.env.SECRECT,
        {
            expiresIn: process.env.EXPIRE
        })
}

Userschema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };
  
module.exports =  mongoose.model("User",Userschema)
