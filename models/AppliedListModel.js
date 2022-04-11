const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const appliedSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  university_name: [{ type: Schema.Types.ObjectId, ref: "University" }],

  applied: {
    type: Boolean,
    default: false,
  },
});

const AppliedList = mongoose.model("AppliedList", appliedSchema);
exports.AppliedList = AppliedList;
