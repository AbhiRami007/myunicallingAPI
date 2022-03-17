const { User } = require("../../models/userModel");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const user = await User.findOne({ email: req.query.email });
  if (user) {
    const userPayload = {
      name: user.name,
      email: user.email,
      phone: user.phone,
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

    res.status(200).json({
      token: "Bearer " + token,
      refreshToken: refreshToken,
      user: user,
    });
  } else {
    res.status(401).json({ message: "invalid credentials!" });
  }
});

module.exports = router;
