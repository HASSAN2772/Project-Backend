const express = require("express")
const { isAuthUser } = require("../auth/auth")
const { charity, numberCharityDonors, getCharityDonors } = require("../controllers/charityController")
const { donateBlood, getAllDonors, getDonors } = require("../controllers/donorController")
const { requestBloodUser, getRequestedDonors, getRequestedBlood, numberRequestedBloood, getSingleRequester, updateRequesterStatus } = require("../controllers/requesterController")
const { TestData } = require("../controllers/Test")
const { getUsers, getUsersRegister, login, loginOut, getAllUsers, getSingleUser, deleteSingleUser, gettotalUsers } = require("../controllers/userController")
const router = express.Router()



router.route("/login").post(login)
router.route("/getusers").get(getAllUsers)
router.route("/register").post(getUsersRegister)
router.route("/logout").get(loginOut)
//
router.route("/user/:id").get(getSingleUser)
router.route("/requester/:id").get(getSingleRequester)
router.route("/delete/:id").delete(deleteSingleUser)
//
router.route("/updatestatus/:id").put(updateRequesterStatus)

// 
router.route("/requested/blood/users").get(getRequestedBlood)
router.route("/requested/users").get(numberRequestedBloood)
router.route("/users").get(gettotalUsers)
//
router.route("/blood/request").post(requestBloodUser)
router.route("/donate/blood").post(isAuthUser,donateBlood)
router.route("/charity").post(isAuthUser,charity)
//testoing
// router.route("/").post(isAuthUser,TestData)
//
router.route("/charity/donor").get(getCharityDonors)
router.route("/charity/donors").get(numberCharityDonors)
//
router.route("/donors/detail").get(getAllDonors)
router.route("/donors").get(getDonors)

module.exports = router