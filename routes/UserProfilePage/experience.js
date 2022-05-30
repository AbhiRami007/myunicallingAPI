const { ExperienceList } = require("../../models/experienceModel");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  let experience = req.body.id
    ? await ExperienceList.findById({
        id: req.body.id,
      })
    : [];

  if (experience && experience.length) {
    experiencePayload = await ExperienceList.updateOne(
      { id: req.body.data.id },
      req.body
    );
  } else {
    experiencePayload = new ExperienceList({
      user: req.body.email,
      company_name: req.body.data.company_name,
      designation: req.body.data.designation,
      employment_type: req.body.data.employment,
      description: req.body.data.description,
      currentWork: req.body.data.currentWork,
      startDate: req.body.data.startDate,
      endDate: req.body.data.endDate,
      location: req.body.data.workLocation,
    });
    experiencePayload = await experiencePayload.save();
  }
  return res.status(200).send({
    message: "Experience Added Successfully",
    experience: experiencePayload,
  });
});

module.exports = router;
