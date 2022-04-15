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

    if (req.query.searchItem) {
      const param = await caseInsensitiveCheck(req.query.searchItem);
      const location = await caseInsensitiveCheck(req.query.location);
      university = await University.find({
        $or: [{ university_name: param }, { course: param }],
        location: location,
      }).sort(
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
