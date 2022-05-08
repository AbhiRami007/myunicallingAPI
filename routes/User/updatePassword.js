const { User, validate } = require("../../models/userModel");
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

router.put("/", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(401).send({ message: "Invalid Email or Password" });
  }
  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword) {
    return res.status(401).send({ message: "Current password is wrong" });
  } else if (req.body.newPassword !== req.body.confirmPassword) {
    return res
      .status(401)
      .send({ message: "New password and Confirm password should be same" });
  } else if (req.body.password == req.body.newPassword) {
    return res
      .status(401)
      .send({ message: "New password should not be same as old password" });
  }
  const salt = await bcrypt.genSalt(Number(process.env.SALT));
  const hashPassword = await bcrypt.hash(req.body.newPassword, salt);

  const userData = await User.findByIdAndUpdate(user.id, {
    password: hashPassword,
  });

  if (!userData)
    return res.status(404).send("The user with the given ID was not found.");

  res.send(userData);
});

module.exports = router;
