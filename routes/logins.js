const { User, validate } = require("../models/signUp");
const mongoose = require("mongoose");
const express = require("express");
const { redirect } = require("express/lib/response");
const router = express.Router();

router.get("/", async (req, res) => {
  const user = await User.findOne({ email: req.query.email });
  if (user) {
    res.send(user);
  }
  res.redirect("/sign-up");
});

module.exports = router;
