const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const certificationSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  organisation: {
    type: String,
    required: true,
  },
  credential_id: {
    type: String,
    required: true,
  },
  credential_url: {
    type: String,
    required: true,
  },

  isExpired: {
    type: Boolean,
    required: true,
  },
  issue_date: {
    type: Date,
    required: true,
  },
  expiry_date: {
    type: Date,
    required: true,
  },
});

const CertificationList = mongoose.model("Certification", certificationSchema);
exports.CertificationList = CertificationList;
