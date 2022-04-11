const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const savedSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  university_name: [{ type: Schema.Types.ObjectId, ref: "University" }],

  IsSaved: {
    type: Boolean,
    default: false,
  },
});

const SavedList = mongoose.model("SavedList", savedSchema);
exports.SavedList = SavedList;
