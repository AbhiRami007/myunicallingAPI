const mongoose = require("mongoose");

const University = mongoose.model(
  "University",
  new mongoose.Schema({
    university_name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    schedule: {
      type: String,
      required: true,
    },
    intake: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
  })
);

exports.University = University;
