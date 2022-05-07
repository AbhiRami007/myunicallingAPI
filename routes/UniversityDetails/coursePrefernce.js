const { PreferenceList } = require("../../models/coursePreferencesModel");
const { University } = require("../../models/universityModel");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  let preference = await PreferenceList.find({
    user: req.body.user,
  });
  let savedPayload = new PreferenceList({
    user: req.body.user,
    country: req.body.country,
    typeOfCourse: req.body.typeOfCourse,
    typeOfMainCourse: req.body.typeOfMainCourse,
    typeOfStudies: req.body.typeOfStudies,
  });
  const id = preference[0].id;
  if (preference.length) {
    savedPayload = await PreferenceList.findByIdAndUpdate(id, {
      savedPayload,
    });
  } else {
    savedPayload = await savedPayload.save();
  }
  return res.status(200).send({
    message: "Saved Successfully",
    university: savedPayload,
  });
});

module.exports = router;
