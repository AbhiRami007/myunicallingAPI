const { AppliedList } = require("../../models/AppliedListModel");
const { University } = require("../../models/universityModel");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  let appliedList = await AppliedList.find({
    user: req.body.user,
    applied: true,
  });
  let appliedPayload;
  let university = await University.find({
    university_name: req.body.university_name,
  });
  if (
    appliedList &&
    appliedList.length &&
    appliedList[0].university_name?.includes(university[0].id)
  ) {
    return res.status(409).send("Already Applied!");
  } else if (
    appliedList &&
    appliedList.length &&
    !appliedList[0].university_name?.includes(university[0].id)
  ) {
    appliedPayload = await AppliedList.updateOne(
      { user: req.body.user },
      {
        $push: {
          university_name: university[0].id,
        },
      }
    );
  } else {
    appliedPayload = new AppliedList({
      user: req.body.user,
      university_name: university[0].id,
      applied: true,
    });
    appliedPayload = await appliedPayload.save();
  }
  return res.status(200).send({
    message: "Applied Successfully",
    university: appliedPayload,
  });
});

module.exports = router;
