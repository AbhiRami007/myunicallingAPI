const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
PORT = 3000;
mongoose.connect("mongodb://localhost:27017/myunicallingDB", {
  useNewUrlParser: true,
});
app.post("/sign-up", (req, res) => {});

app.listen(PORT, () => {
  console.log(`MYUNICALLING app listening on port ${PORT}`);
});
