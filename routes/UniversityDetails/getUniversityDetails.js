const { University } = require("../../models/universityModel");
const { AppliedList } = require("../../models/AppliedListModel");
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

    if (preference.length && !(req.query.applied || req.query.isSaved)) {
      const location = await caseInsensitiveCheck(preference[0].country);
      const typeOfMainCourse = await caseInsensitiveCheck(
        preference[0].typeOfMainCourse
      );
      const typeOfStudies = await caseInsensitiveCheck(
        preference[0].typeOfStudies
      );
      university = req.query.others
        ? await University.find({
            $and: [
              { typeOfMainCourse: { $not: typeOfMainCourse } },
              { typeOfStudies: { $not: typeOfStudies } },
              { location: location },
            ],
          }).sort(
            req.query.sortOrder == "DESC"
              ? {
                  university_name: -1,
                }
              : { university_name: 1 }
          )
        : await University.find({
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
    } else if (req.query.location && !req.query.course) {
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
        isSaved: true,
      })
        .populate({ path: "university_name" })
        .exec();
      university = university.university_name;
    } else {
      university =
        !req.query.others &&
        (await University.find().sort(
          req.query.sortOrder == "DESC"
            ? {
                university_name: -1,
              }
            : { university_name: 1 }
        ));
    }

    if (university.length) {
      return res.status(200).send({
        message: "University fetched successfully",
        university: university,
      });
    }
    return res.status(200).send({
      message: "No Universities found",
      university: [],
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
});

module.exports = router;
