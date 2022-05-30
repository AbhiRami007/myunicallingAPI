const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  firstname: {
    String,
  },
  lastname: {
    String,
  },
  location: {
    String,
  },
  designation: { String },
  latest_education: { String },
  latest_experience: { String },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  userRole: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  about: {
    type: String,
  },
  experience: [{ type: Schema.Types.ObjectId, ref: "Experience" }],
  education: [{ type: Schema.Types.ObjectId, ref: "Education" }],
  certifications: [{ type: Schema.Types.ObjectId, ref: "Certification" }],
  skills: [],
  projects: [{}],
  languages: [],
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
};

const User = mongoose.model("User", userSchema);
exports.User = User;
