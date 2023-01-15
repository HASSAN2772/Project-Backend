const mongoose = require("mongoose")
const User = require("../Models/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")
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
        console.log(email)
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
        deleteSingleUser.remove()
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

module.exports.getOttpByEmail = async(req,res)=>
{
    const {email} = req.body
    console.log(email)

    if(!email)
    {
       return res.status(401).json({
            message:"Invalid Crendials"
        })
    }
    try{
        const transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:"khansameer9226@gmail.com",
                pass:"qtriktblafvspoqy"
            }
        })
        const exitUser = await User.findOne({email:req.body.email})
        const userOttpToken = jwt.sign({_id: exitUser._id},process.env.SECRECT,
            {
                expiresIn:"1d"
            })
            // console.log("Token For Reset",userOttpToken)
            const setUserToken = await User.findByIdAndUpdate({_id:exitUser._id},{resetPasswordToken:userOttpToken},
                {
                    new:true,
                })
            //   console.log("setUserToken",setUserToken)
            if(setUserToken)
            {
                const mailOptions = {
                    from: 'khansameer9226@gmail.com', // sender address
                                to: req.body.email, // list of receivers
                                subject: "OTTP for Reset Password", // Subject line
                                text:`This link is valid for 2 min http://localhost:3000/forgot/password/token/${exitUser.id}/${setUserToken.resetPasswordToken}` // plain text body
                }
                transporter.sendMail(mailOptions,(error,info)=>
                {
                    if(error)
                    {
                        console.log(error)
                        res.status(401).json({
                            message:"Email not send"
                        })
                    }
                    else{
                        console.log("Email is Send",info.response)
                        res.status(200).json({
                            message:"Email send successfully"
                        })
                    }
                })
            }


        }
    catch(error)
    {

        res.status(405).json({
            message:"Invalid User"
        })

    }

}

module.exports.verifyUserByResetToken = async(req,res)=>
{
    const {id,token} = req.params
    // console.log(id)
    try{
        const validUser = await User.findOne({_id:id,resetPasswordToken:token})
        // console.log(validUser)
        const verifyToken = jwt.verify(token,process.env.SECRECT)
        // console.log(verifyToken)
        if(validUser && verifyToken._id)
    {
        res.status(201).json({
            validUser,
        })
    }
    else
    {
        res.status(401).json({
            message:"User Not Exist",
        })
    }
    }
    catch(error)
    {
        res.status(401).json({
            message:error,
        })
    }

}

module.exports.updatePasswordReset = async(req,res)=>
{
   const {id,token} = req.params;
   const {password} = req.body;
   console.log(password)
   console.log(id)
   try{
    const validUser = await User.findOne({_id:id,resetPasswordToken:token})
    // console.log(validUser)
    const verifyToken = jwt.verify(token,process.env.SECRECT)
    // console.log(verifyToken)
    if(validUser && verifyToken._id)
    {
        const newPassword = await bcrypt.hash(password,12);
        const setNewUserPassUpdate = await User.findByIdAndUpdate({_id:id},{password:newPassword})
        setNewUserPassUpdate.save()
        res.status(201).json({
            message:"Password Update Successfully",
            setNewUserPassUpdate
        })
    }
    else
    {
        res.status(401).json({
            message:"User Not Exist",
        })
    }
   }
   catch(err)
   {
    res.status(401).json({
        message:err,
    })
   }
}

module.exports.updateUserRole = async(req,res)=>
{
  try
  {
    const {id} = req.params;
    console.log(id)
    const updateUserRole = await User.findByIdAndUpdate(id,req.body,
      {
        new:true
      });
    console.log(updateUserRole)
    res.status(200).json({
      success:true,
      message:"Status Updated Successfully",
      updateUserRole,
    })
  }
  catch(err)
  {
    console.log(err)
  }
}