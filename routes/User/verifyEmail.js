const { User } = require("../../models/userModel");
const { Token } = require("../../models/token");

const express = require("express");
const router = express.Router();

router.get("/:id/verify/:token", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "Invalid url!" });
    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send({ message: "Invalid url!" });
    await User.updateOne({ _id: req.params.id }, { isVerified: true });
    await token.remove();
    return res.render("verificationPage");
  } catch (error) {
    return res.status(400).send({ message: "Invalid url!" });
  }
});

module.exports = router;
