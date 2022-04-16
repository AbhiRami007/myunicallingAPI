const { User } = require("../../models/userModel");
const { validate } = require("../../validator/validateLogin");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Token = require("../../models/token");
const sendEmail = require("../../utils/sendEmail");
const crypto = require("crypto");

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).send({ message: "Invalid Email or Password" });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(401).send({ message: "Invalid Password" });
    }
    if (user && !user.isVerified) {
      let token = Token.findOne({
        userId: user._id,
      });
      if (!token) {
        token = await new Token({
          userId: user._id,
          token: crypto.randomBytes(32).toString("hex"),
        }).save();
        const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;
        await sendEmail(
          user.email,
          "Verify Email",
          `Please verify your identity by following the link ${url}`
        );
        return res.status(200).send({
          message:
            "An Email is sent to your registered mail id, Please verify to proceed!",
        });
      }
    }
    const userPayload = {
      name: user.name,
      email: user.email,
      phone: user.phone,
      userRole: user.userRole,
    };
    const token = user.generateAuthToken();
    return res.status(200).send({
      message: "Logged in successfully",
      token: "Bearer " + token,
      user: userPayload,
    });
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = router;
