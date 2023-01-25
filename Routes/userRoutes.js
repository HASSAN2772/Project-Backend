const express = require("express");
const { isAuthUser } = require("../auth/auth");
const {
  charity,
  numberCharityDonors,
  getCharityDonors,
  deleteSingleCharity,
  getSingleCharityUser,
} = require("../controllers/charityController");
const {
  donateBlood,
  getAllDonors,
  getDonors,
  getSingleDonor,
  updateBloodStatus,
  deleteSingleDonor,
} = require("../controllers/donorController");
const {
  requestBloodUser,
  getRequestedDonors,
  getRequestedBlood,
  numberRequestedBloood,
  getSingleRequester,
  updateRequesterStatus,
  deleteSingleRequester,
} = require("../controllers/requesterController");
const { TestData } = require("../controllers/Test");
const {
  getUsers,
  getUsersRegister,
  login,
  loginOut,
  getAllUsers,
  getSingleUser,
  deleteSingleUser,
  gettotalUsers,
  getOttpByEmail,
  submitOttp,
  verifyUserByResetToken,
  updatePasswordReset,
  updateUserRole,
} = require("../controllers/userController");
const { updateUserStatus } = require("../Models/userModel");
const { searchApp } = require("../utils/apiSearch");
const router = express.Router();

router.route("/login").post(login);
router.route("/getusers").get(getAllUsers);
router.route("/register").post(getUsersRegister);
router.route("/logout").get(loginOut);
//

//
router.route("/user/:id").get(getSingleUser);
router.route("/donor/:id").get(getSingleDonor);
router.route("/requester/:id").get(getSingleRequester);
router.route("/charity/user/:id").get(getSingleCharityUser);
router.route("/delete/:id").delete(deleteSingleUser);
router.route("/delete/requester/:id").delete(deleteSingleRequester);
router.route("/delete/charity/user/:id").delete(deleteSingleCharity);
router.route("/delete/blooddonor/:id").delete(deleteSingleDonor);
//
router.route("/updatestatus/:id").put(updateRequesterStatus);
router.route("/update/role/user/:id").put(updateUserRole);
router.route("/update/donor/:id").put(updateBloodStatus);

//
router.route("/requested/blood/users").get(getRequestedBlood);
router.route("/requested/users").get(numberRequestedBloood);
router.route("/users").get(gettotalUsers);
//
router.route("/blood/request").post(requestBloodUser);
router.route("/donate/blood").post(donateBlood);
router.route("/charity").post(charity);
//testoing
// router.route("/").post(isAuthUser,TestData)
//
router.route("/charity/donor").get(getCharityDonors);
router.route("/charity/donors").get(numberCharityDonors);
//
router.route("/donors/detail").get(getAllDonors);
router.route("/donors").get(getDonors);
router.route("/application/:key").get(searchApp);
//
router.route("/forgot/password").post(getOttpByEmail);
router.route("/forgot/password/token/:id/:token").get(verifyUserByResetToken);
router.route("/:id/:token").post(updatePasswordReset);
// router.route("/password/ottp/:id/:token").post(submitOttp)

module.exports = router;
