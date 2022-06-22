const { ProjectList } = require("../../models/projectModel");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    let project = req.body.id
      ? await ProjectList.findById({
          _id: req.body.id,
        })
      : [];

    if (project) {
      projectPayload = await ProjectList.updateOne(
        { _id: req.body.id },
        req.body.data
      );
    } else {
      projectPayload = new ProjectList({
        user: req.body.email,
        name: req.body.data.name,
        associated_with: req.body.data.associated_with,
        project_url: req.body.data.project_url,
        currentProject: req.body.data.currentWork,
        startDate: req.body.data.startDate,
        endDate: req.body.data.endDate,
        description: req.body.data.description,
      });
      projectPayload = await projectPayload.save();
    }
    return res.status(200).send({
      message: "project Added Successfully",
      project: projectPayload,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
});

module.exports = router;
