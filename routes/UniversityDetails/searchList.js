const { University } = require("../../models/universityModel");
const express = require("express");
const { PreferenceList } = require("../../models/coursePreferencesModel");

const router = express.Router();

const caseInsensitiveCheck = (string) => {
  return new RegExp([string].join(""), "i");
};
router.get("/", async (req, res) => {
  try {
    let university;
    let preference = await PreferenceList.find({
      user: req.query.user,
    });
    if (preference.length && !req.query.common) {
      const param = caseInsensitiveCheck(req.query.searchItem);
      const location = caseInsensitiveCheck(preference.location);
      const typeOfMainCourse = await caseInsensitiveCheck(
        preference[0].typeOfMainCourse
      );
      const typeOfStudies = await caseInsensitiveCheck(
        preference[0].typeOfStudies
      );
      university = await University.find({
        $or: [
          { location: param },
          { university_name: param },
          { course: param },
        ],

        $and: [
          { typeOfMainCourse: typeOfMainCourse },
          { typeOfStudies: typeOfStudies },
          { location: location },
        ],
      }).sort(
        req.query.sortOrder == "DESC"
          ? {
              university_name: -1,
            }
          : { university_name: 1 }
      );
    } else if (req.query.searchItem && req.query.location) {
      const param = await caseInsensitiveCheck(req.query.searchItem);
      const location = await caseInsensitiveCheck(req.query.location);
      university = await University.find({
        $or: [
          { location: param },
          { university_name: param },
          { course: param },
        ],
        location: location,
      }).sort(
        req.query.sortOrder == "DESC"
          ? {
              university_name: -1,
            }
          : { university_name: 1 }
      );
    } else if (req.query.searchItem && !req.query.location) {
      const param = await caseInsensitiveCheck(req.query.searchItem);

      university = await University.find({
        $or: [
          { location: param },
          { university_name: param },
          { course: param },
        ],
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
    return res.status(200).send({
      message: "No Universities found",
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
});

module.exports = router;
