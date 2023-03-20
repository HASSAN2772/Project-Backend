const UserComment = require("../Models/commentUser");
const mongoose = require("mongoose");
module.exports.getUserComment = (req, res) => {
  const { comment, email, name } = req.body;
  if (!name && !email && !comment) {
    res.status(204).json({
      message: "Invalid fields ",
    });
  } else {
    const Comment = new UserComment({
      name: req.body.name,
      email: req.body.email,
      comment: req.body.comment,
    });
    Comment.save();
    res.status(200).json({
      success: true,
      Comment,
    });
  }
  //   getUserComment.save((error, result) => {
  //     if (error) {
  //       console.log(error);
  //       res.status(400).json({
  //         error: error,
  //       });
  //     } else {
  //       console.log(result);
  //       res.status(200).json({
  //         success: true,
  //       });
  //     }
  //   });
};
