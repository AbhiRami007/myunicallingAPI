const { User } = require("../../models/userModel");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const userData = await User.find({ email: req.query.email });

    if (userData.length) {
      return res.status(200).send({
        message: "User data fetched successfully",
        userInformation: userData[0],
      });
    }
    return res.status(200).send({
      message: "User data Not found",
      userInformation: [],
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
});

module.exports = router;
