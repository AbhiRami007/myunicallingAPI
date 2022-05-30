const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const experienceSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  company_name: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  employment_type: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  currentWork: {
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

const ExperienceList = mongoose.model("Experience", experienceSchema);
exports.ExperienceList = ExperienceList;
