const mongoose = require("mongoose");
var cors = require("cors");
const express = require("express");
var cors = require("cors");
const app = express();
require("dotenv").config();
const methodOverride = require("method-override");
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
const searchList = require("./routes/UniversityDetails/searchList");
const verifyEmail = require("./routes/User/verifyEmail");
const applyToUniversity = require("./routes/UniversityDetails/applyToUniversity");
const removeUniversity = require("./routes/UniversityDetails/removeSavedUniversity");
mongoose
  .connect("mongodb://127.0.0.1:27017/myunicallingDB")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

// const url =
//   process.env.DB_URI ||
//   `mongodb+srv://myUniCalling:OdadbivhvT1yBrUG@myunicallingcluster.mjqmv.mongodb.net/myUniCallingDB?retryWrites=true&w=majority`;

// const connectionParams = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };
// mongoose
//   .connect(url, connectionParams)
//   .then(() => {
//     console.log("Connected to database ");
//   })
//   .catch((err) => {
//     console.error(`Error connecting to the database. \n${err}`);
//   });
app.use(cors());
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
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
app.use("/university-list", getUniversity);
app.use("/university-search-list", searchList);
app.use("/university-list/:location", getUniversity);
app.use("/users", verifyEmail);
app.use("/apply-to-university", applyToUniversity);
app.use("/save-university", saveUniversity);
app.use("/remove-from-saved", removeUniversity);

const port = process.env.PORT;
app.listen(3000, () => {
  console.log(`MYUNICALLING app listening on port ${port}`);
});
