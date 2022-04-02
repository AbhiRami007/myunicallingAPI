const { University } = require("../../models/universityModel");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  let university = await University.findOne({
    university_name: req.body.university_name,
    location: req.body.location,
    course: req.body.course,
    specialization: req.body.specialization,
  });
  if (
    university &&
    university.university_name == req.body.university_name &&
    university.location == req.body.location &&
    university.course == req.body.course &&
    university.specialization == req.body.specialization
  ) {
    res
      .status(401)
      .send("The University with the specified course is already added");
  } else {
    let universityPayload = new University({
      university_name: req.body.university_name,
      location: req.body.location,
      course: req.body.course,
      specialization: req.body.specialization,
      duration: req.body.duration,
      schedule: req.body.schedule,
      intake: req.body.intake,
      icon: req.body.icon,
    });
    universityPayload = await universityPayload.save();
    res.status(200).send({
      message: "University saved successfully",
      university: universityPayload,
    });
  }
});

module.exports = router;
