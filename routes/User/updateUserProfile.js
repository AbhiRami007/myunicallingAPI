const { User } = require("../../models/userModel");
const express = require("express");
const router = express.Router();

router.put("/", async (req, res) => {
  try {
    const userData = await User.find({ email: req.body.email });
    // const experienceExists = await User.find({
    //   experience: req.body.experience,
    // });
    // const educationExists = await User.find({ education: req.body.education });

    if (userData.length) {
      const userPayload = {
        name: userData[0].name,
        firstName: req.body.data.firstname,
        lastName: req.body.data.lastname,
        location: req.body.data.location,
        designation: req.body.data.designation,
        latest_education: req.body.data.college_name
          ? req.body.data.college_name
          : req.body.college_name,
        latest_experience: req.body.data.company_name
          ? req.body.data.company_name
          : req.body.latest_experience,
        email: userData[0].email,
        phone: userData[0].phone,
        password: userData[0].password,
        userRole: userData[0].userRole,
        isVerified: userData[0].isVerified,
        about: req.body.data.about,
        $push: {
          experience: req.body.experience &&
            req.body.experience.company_name && {
              $each: [req.body.experience],
              $position: 0,
            },

          education: req.body.education &&
            req.body.education.college_name && {
              $each: [req.body.education],
              $position: 0,
            },
          certifications: req.body.certifications &&
            req.body.certifications.name && {
              $each: [req.body.certifications],
              $position: 0,
            },

          projects: req.body.projects &&
            req.body.projects.projectName && {
              $each: [req.body.projects],
              $position: 0,
            },
        },
        skills: req.body.data.skills
          ? req.body.data.skills
          : userData[0].skills,
        languages: req.body.data.languages
          ? req.body.data.languages
          : userData[0].languages,
      };
      const user = await User.updateOne({ _id: userData[0].id }, userPayload);
      return res.status(200).send({
        message: "Updated",
        userInformation: user,
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
