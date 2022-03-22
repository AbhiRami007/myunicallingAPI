const { University } = require("../../models/universityModel");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  let university = await University.find();

  res.status(200).send({
    message: "University fetched successfully",
    university: university,
  });
});

module.exports = router;
