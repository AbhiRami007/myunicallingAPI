const { EducationList } = require("../../models/educationModel");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  let education = req.body.id
    ? await EducationList.findById({
        id: req.body.id,
      })
    : [];

  if (education && education.length) {
    educationPayload = await EducationList.updateOne(
      { id: req.body.data.id },
      req.body
    );
  } else {
    educationPayload = new EducationList({
      user: req.body.email,
      college_name: req.body.data.college_name,
      degree: req.body.data.degree,
      location: req.body.data.location,
      field: req.body.data.field,
      currentStudy: req.body.data.currentWork,
      startDate: req.body.data.startDate,
      endDate: req.body.data.endDate,
      description: req.body.data.description,
    });
    educationPayload = await educationPayload.save();
  }
  return res.status(200).send({
    message: "Education Added Successfully",
    education: educationPayload,
  });
});

module.exports = router;
