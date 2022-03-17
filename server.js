const mongoose = require("mongoose");
const signup = require("./routes/signUps");
const login = require("./routes/logins");
const express = require("express");
const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/myunicallingDB")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.use(express.json());
app.use("/api/login", login);
app.use("/api/sign-up", signup);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`MYUNICALLING app listening on port ${port}`);
});
