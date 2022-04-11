const { University } = require("../../models/universityModel");
const { AppliedList } = require("../../models/AppliedListModel");
const express = require("express");
const { SavedList } = require("../../models/savedListModel");
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
    } else if (req.query.user && req.query.applied) {
      university = await AppliedList.findOne({
        user: req.query.user,
        applied: true,
      })
        .populate({ path: "university_name" })
        .exec();
      university = university.university_name;
    } else if (req.query.user && req.query.isSaved) {
      university = await SavedList.findOne({
        user: req.query.user,
        applied: true,
      })
        .populate({ path: "university_name" })
        .exec();
      university = university.university_name;
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
    return res.status(404).send({
      message: "No Universities found",
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
});

module.exports = router;
