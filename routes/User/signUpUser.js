const { User } = require("../../models/userModel");
const { validate } = require("../../validator/validateUser");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  if (req.body.password == req.body.confirmPassword) {
    if (!user) {
      let user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        userRole: req.body.userRole,
        isVerified: false,
      });
      user = await user.save();
      res.send(user);
    } else {
      res.status(500).send("Email Id already Registered!");
    }
  } else {
    res.status(500).send("Confirm Password should be same as Password");
  }
});

module.exports = router;
