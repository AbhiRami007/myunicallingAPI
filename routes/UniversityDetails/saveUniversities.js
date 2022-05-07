const { SavedList } = require("../../models/savedListModel");
const { University } = require("../../models/universityModel");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  let savedList = await SavedList.find({
    user: req.body.user,
    isSaved: true,
  });
  let savedPayload;
  let university = await University.find({
    _id: req.body.university_name,
  });
  if (
    savedList &&
    savedList.length &&
    savedList[0].university_name?.includes(university[0].id)
  ) {
    return res.status(409).send("Already Saved!");
  } else if (
    savedList &&
    savedList.length &&
    !savedList[0].university_name?.includes(university[0].id)
  ) {
    savedPayload = await SavedList.updateOne(
      { user: req.body.user },
      {
        $push: {
          university_name: university[0].id,
        },
      }
    );
  } else {
    savedPayload = new SavedList({
      user: req.body.user,
      university_name: university[0].id,
      isSaved: true,
    });
    savedPayload = await savedPayload.save();
  }
  return res.status(200).send({
    message: "Applied Successfully",
    university: savedPayload,
  });
});

module.exports = router;
