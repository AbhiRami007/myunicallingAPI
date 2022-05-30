const { User } = require("../../models/userModel");
const { Applied } = require("../../models/AppliedListModel");
const { Saved } = require("../../models/savedListModel");
const { Token } = require("../../models/token");
const sendEmail = require("../../utils/sendEmail");
const crypto = require("crypto");

const express = require("express");
const router = express.Router();

router.put("/", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  let appliedUser = await Applied.findOne({ user: req.body.email });
  let savedUser = await Saved.findOne({ user: req.body.email });
  if (!user) {
    return res
      .status(409)
      .send({ message: "Email Id not registered with us!" });
  } else if (user.email == req.body.updatedEmail) {
    return res.status(400).send({
      message: "New email should not be same as existing email",
    });
  }
  await User.findByIdAndUpdate(user.id, {
    email: req.body.updatedEmail,
    isVerified: false,
  });
  await Applied.findByIdAndUpdate(appliedUser.id, {
    user: req.body.updatedEmail,
  });
  await Saved.findByIdAndUpdate(savedUser.id, {
    user: req.body.updatedEmail,
  });
  const token = await Token.find({
    userId: user._id,
    token: req.params.token,
  });

  const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;
  await sendEmail(
    req.body.updatedEmail,
    "Email updation verification",
    `<h1>Email Verification</h1>
      <h2>Hello ${user.name}</h2>
      <p>Thank you for registering with us. Please confirm your email by clicking on the following link</p>
      <a href=${url}> Click here</a>
      </div>`
  );
  return res.status(201).send({
    message:
      "An Email is sent to your requested mail id, Please verify to proceed!",
  });
});

module.exports = router;
