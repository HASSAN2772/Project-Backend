const mongoose = require("mongoose")
const User = require("../Models/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const sendToken = require("../utils/jwtToken")

module.exports.getUsersRegister = async (req, res) => {
    try {
        const { firstname, lastname, email, password, cpassword } = req.body
        if (!firstname || !lastname || !email || !password || !cpassword) {
            return res.status(400).json({
                errmessage: "Please Enter All require fields"
            })
        }
        if (!password.lenght > 6) {
            return res.status(400).json({
                errmessage: "Passwoword must be more than 6 chgaracters "
            })
        }
        if (password !== cpassword) {
            return res.status(400).json({
                errmessage: "Please Enter sSame Passwords"
            })
        }
        const existUser = await User.findOne({email:email})
        if(existUser)
        {
            return res.status(204).json({
                mesaage:`Already exist email Try another one`
            })
        }
        

        const user = new User({
            firstName: firstname,
            lastName: lastname,
            email: email,
            password: password,
            cpassword: cpassword,
        })
        user.save((error, resp) => {
            if (error) {
                console.log(error)
            }
            else {
                console.log(resp)
            }
        })
        // const token = user.generateUserToken();
        // res.status(200).json({
        //     success: true,
        //     token,
        //     message:"succesuuf;u registered"
        // })
        sendToken(user,200,res)

    }
    catch (err) {
        console.log(err)
        res.status(500).send("There is a probelm while saving or sending token ot uset")
    }

}

module.exports.login = async (req, res) => {
    try {

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send('Please enter Username and Password')
        }
        const userlogin = await User.findOne({ email: email });
        // console.log(useremail);
        if (!userlogin) {
            return res.status(202).json({
                message:"User not register "
            })
        } 
        const ismatch = await userlogin.comparePassword(password);


        if (!ismatch) {
            return res.status(205).json({
                mesaage:"Password not match "
            })
        }
    //    res.status(200).json({
    //     success:true,
    //     token,
    //     userlogin,
    //     message:"Login Successfulyy"
    //    })
    sendToken(userlogin,200,res)

    } catch (err) {
        res.send(err)
    }
}

module.exports.loginOut = async (req, res) => 
{
    try{

       res.cookie("token",null,{
            expires: new Date(Date.now()),
            httpOnly:true,
        });

        res.status(200).json({
            success:true,
            message:"logout succesuflly"
        })
    }
    catch(err)
    {
        console.log(err.message)
    }

}


// geting all user

module.exports.getAllUsers = async(req,res)=>
{
    try{

        const getAllUserData = await User.find();
        // console.log(getAllUserData)
        res.status(200).json({
            success:true,
            getAllUserData,
        })
    }
    catch(err)
    {
console.log(err)
    }
}

module.exports.gettotalUsers = async(req,res)=>
{
    try{

        const gettotalUsers = await User.count();
        // console.log(getAllUserData)
        res.status(200).json({
            success:true,
            gettotalUsers,
        })
    }
    catch(err)
    {
console.log(err)
    }
}

// getting indiual user

module.exports.getSingleUser = async(req,res)=>
{
    try{
        const {id} = req.params
        console.log(id)
        const getSingleUserData = await User.findById({_id:id});

        // console.log(getAllUserData)
        res.status(200).json({
            success:true,
            getSingleUserData,
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
// dele user

module.exports.deleteSingleUser = async(req,res)=>
{
    try{
        const {id} = req.params
        console.log(id)
        const deleteSingleUser = await User.findByIdAndDelete({_id:id});
        // console.log(getAllUserData)
        res.status(200).json({
            success:true,
            message:"user deleted successfully",
            deleteSingleUser,
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