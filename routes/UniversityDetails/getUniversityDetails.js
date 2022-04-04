const { University } = require("../../models/universityModel");
const express = require("express");
const router = express.Router();

const caseInsensitiveCheck = (string) => {
  return new RegExp([string].join(""), "i");
};
router.get("/", async (req, res) => {
  try {
    let university;

    if (req.query.location && !req.query.course) {
      const location = await caseInsensitiveCheck(req.query.location);
      university = await University.find({ location: location }).sort(
        req.query.sortOrder == "DESC"
          ? {
              university_name: -1,
            }
          : { university_name: 1 }
      );
    } else if (req.query.course && !req.query.location) {
      const course = await caseInsensitiveCheck(req.query.course);
      university = await University.find({ course: course }).sort(
        req.query.sortOrder == "DESC"
          ? {
              university_name: -1,
            }
          : { university_name: 1 }
      );
    } else if (req.query.course && req.query.location) {
      const location = await caseInsensitiveCheck(req.query.location);
      const course = await caseInsensitiveCheck(req.query.course);
      university = await University.find({
        course: course,
        location: location,
      }).sort(
        req.query.sortOrder == "DESC"
          ? {
              university_name: -1,
            }
          : { university_name: 1 }
      );
    } else {
      university = await University.find().sort(
        req.query.sortOrder == "DESC"
          ? {
              university_name: -1,
            }
          : { university_name: 1 }
      );
    }

    if (university.length) {
      return res.status(200).send({
        message: "University fetched successfully",
        university: university,
      });
    }
    return res.status(400).send({
      message: "No Universities found",
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
});

module.exports = router;
