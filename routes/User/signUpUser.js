const { User } = require("../../models/userModel");
const { validate } = require("../../validator/validateUser");
const bcrypt = require("bcrypt");
const { Token } = require("../../models/token");
const sendEmail = require("../../utils/sendEmail");
const crypto = require("crypto");

const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({ email: req.body.email });
  if (user)
    return res.status(409).send({ message: "Email Id already Registered!" });

  if (req.body.password == req.body.confirmPassword) {
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    let user = new User({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: hashPassword,
      userRole: req.body.userRole,
      isVerified: req.body.isVerified,
    });
    user = await user.save();
    const token = await Token.find({ userId: user._id });
    const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;
    await sendEmail(
      user.email,
      "Verify Email",
      `<h1>Email Confirmation</h1>
      <h2>Hello ${user.name}</h2>
      <p>Thank you for signing up. Please confirm your email by clicking on the following link</p>
      <a href=${url}> Click here</a>
      </div>`
    );
    return res.status(201).send({
      message:
        "An Email is sent to your registered mail id, Please verify to proceed!",
    });
  }

  return res.status(500).send("Confirm Password should be same as Password");
});

module.exports = router;
