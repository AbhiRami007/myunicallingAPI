const { User } = require("../../models/userModel");
const { EducationList } = require("../../models/educationModel");
const { ExperienceList } = require("../../models/experienceModel");
const { CertificationList } = require("../../models/certificationModel");
const { ProjectList } = require("../../models/projectModel");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const userData = await User.find({ email: req.query.email })
      .populate([
        { path: "education", model: EducationList },
        { path: "experience", model: ExperienceList },
        { path: "certifications", model: CertificationList },
        { path: "projects", model: ProjectList },
      ])
      .exec();

    if (userData.length) {
      return res.status(200).send({
        message: "User data fetched successfully",
        userInformation: userData[0],
      });
    }
    return res.status(200).send({
      message: "User data Not found",
      userInformation: [],
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
});

module.exports = router;
