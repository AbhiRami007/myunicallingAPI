const { User } = require("../../models/userModel");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (
    user &&
    user.email == req.body.email &&
    user.password == req.body.password
  ) {
    const userPayload = {
      name: user.name,
      email: user.email,
      phone: user.phone,
      userRole: user.userRole,
    };
    const token = jwt.sign(userPayload, "SECRET", {
      expiresIn: "2 days",
    });
    const refreshToken = jwt.sign(userPayload, "SECRET_REFRESH");
    res.cookie("token", "Bearer " + token, {
      maxAge: 900000,
      sameSite: "None",
      secure: true,
      httpOnly: true,
    });
    res.cookie("refreshToken", refreshToken, {
      maxAge: 900000,
    });

    res.status(200).send({
      message: "Logged in successfully",
      token: "Bearer " + token,
      refreshToken: refreshToken,
      user: userPayload,
    });
  } else {
    res.status(401).send("invalid credentials!");
  }
});

module.exports = router;
