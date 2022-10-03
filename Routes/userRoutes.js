const express = require("express")
const { charity, numberCharityDonors } = require("../controllers/charityController")
const router = express.Router()


router.route('/user').post((req,res)=>
{
    res.send({message:"User Route Works Fine"})
    console.log("User Router Working Fine")
})
router.route("/register").post((req,res)=>
{
    res.send({message:"User Added Successfully"})

})

router.route("/charity/").get(numberCharityDonors)
router.route("/charity/donors").get(numberCharityDonors)
router.route("/charity").post(charity)
module.exports = router