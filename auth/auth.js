const jwt = require("jsonwebtoken")
const User = require("../Models/userModel")

exports.isAuthUser = async (req,res,next)=>
{
    try
    {
        const {token} = req.cookies;
        // console.log(token)

        if(!token)
        {
            return res.status(204).json({
                success:false,
                message:"User not login "
            })
        }
        const decodedData = jwt.verify(token,process.env.SECRECT);
        req.user = await User.findById(decodedData.id);
        next();

    }
    catch(err)
    {
        console.log(err)
    }
}
