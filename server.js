const mongoose = require("mongoose");
const signupUser = require("./routes/User/signUpUser");
const loginUser = require("./routes/User/loginUser");
const updateUser = require("./routes/User/updateUser");
const deleteUser = require("./routes/User/deleteUser");
const express = require("express");
const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/myunicallingDB")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.use(express.json());
app.use("/api/login", loginUser);
app.use("/api/sign-up", signupUser);

app.use("/api/update-user-details", updateUser);
app.use("/api/remove-account", deleteUser);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`MYUNICALLING app listening on port ${port}`);
});
