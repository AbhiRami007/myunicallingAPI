const mongoose = require("mongoose");
const signupUser = require("./routes/User/signUpUser");
const loginUser = require("./routes/User/loginUser");
const updateUser = require("./routes/User/updateUser");
const deleteUser = require("./routes/User/deleteUser");
const fileUpload = require("./routes/FileUploadDownload/uploads");
const fileDownload = require("./routes/FileUploadDownload/download");
const universityLogo = require("./routes/FileUploadDownload/university-logo");
const universityBrochureUpload = require("./routes/FileUploadDownload/university-brochure-upload");
const universityBrochureDownload = require("./routes/FileUploadDownload/university-brochure-download");
const saveUniversity = require("./routes/UniversityDetails/saveUniversities");
const getUniversity = require("./routes/UniversityDetails/getUniversityDetails");
const express = require("express");
var cors = require("cors");
const app = express();
app.use(cors());
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
mongoose
  .connect("mongodb://127.0.0.1:27017/myunicallingDB")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.use(express.json());
app.use("/login", loginUser);
app.use("/sign-up", signupUser);

app.use("/update-user-details", updateUser);
app.use("/remove-account", deleteUser);
app.use("/upload", fileUpload);
app.use("/file-download", fileDownload);
app.use("/logo", universityLogo);
app.use("/brochure-upload", universityBrochureUpload);
app.use("/brochure-download", universityBrochureDownload);
app.use("/university", saveUniversity);
app.use("/university-list", getUniversity);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`MYUNICALLING app listening on port ${port}`);
});
