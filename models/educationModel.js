const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const educationSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  college_name: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  field: {
    type: String,
    required: true,
  },
  currentStudy: {
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

const EducationList = mongoose.model("Education", educationSchema);
exports.EducationList = EducationList;
