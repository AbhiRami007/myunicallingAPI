const { University } = require("../../models/universityModel");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  let universityList = await University.find({
    location: req.body.location,
    course: req.body.course,
    typeOfMainCourse: req.body.typeOfMainCourse,
    typeOfStudies: req.body.typeOfStudies,
  });
  let savedPayload;

  if (universityList && universityList.length) {
    return res.status(409).send("Already Added!");
  } else {
    savedPayload = new University({
      university_name: req.body.university_name,
      location: req.body.location,
      course: req.body.course,
      specialization: req.body.specialization,
      duration: req.body.duration,
      schedule: req.body.schedule,
      intake: req.body.intake,
      typeOfMainCourse: req.body.typeOfMainCourse,
      typeOfStudies: req.body.typeOfStudies,
      icon: req.body.icon,
    });
    savedPayload = await savedPayload.save();
  }
  return res.status(200).send({
    message: "Added Successfully",
    university: savedPayload,
  });
});

module.exports = router;
