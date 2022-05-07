const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const preferenceSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  typeOfCourse: {
    type: String,
    required: true,
  },
  typeOfMainCourse: {
    type: String,
    required: true,
  },
  typeOfStudies: {
    type: String,
    required: true,
  },
});

const PreferenceList = mongoose.model("PreferenceList", preferenceSchema);
exports.PreferenceList = PreferenceList;
