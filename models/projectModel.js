const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const projectSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },
  associated_with: {
    type: String,
    required: true,
  },
  project_url: {
    type: String,
    required: true,
  },

  currentProject: {
    type: Boolean,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
  },
});

const ProjectList = mongoose.model("Project", projectSchema);
exports.ProjectList = ProjectList;
