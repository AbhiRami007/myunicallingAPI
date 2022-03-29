const mongodb = require("mongodb");
const express = require("express");
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const { User } = require("../../models/userModel");
const router = express.Router();
eval(
  `Grid.prototype.findOne = ${Grid.prototype.findOne
    .toString()
    .replace("nextObject", "next")}`
);

const connection = mongoose.connection;

router.get("/", async (req, res) => {
  if (req.query.email) {
    const user = await User.findOne({ metadata: { user: req.query.email } });
    var id = user._id;

    const gridfsBucket = new mongoose.mongo.GridFSBucket(
      mongoose.connection.db,
      {
        bucketName: `student-documents`,
      }
    );

    gfs = Grid(connection.db, mongoose.mongo);

    gfs
      .collection(`student-documents`)
      .findOne({ _id: mongodb.ObjectId(id) }, (err, file) => {
        if (err) {
          res.status(404).send("File Not Found!");
        } else {
          const readStream = gridfsBucket.openDownloadStream(file._id);

          readStream.on("error", (err) => {
            res.status(500).send("Internal Server Error");
          });
          readStream.pipe(res);
        }
      });
  } else {
    res.status(404).send("File not found");
  }
});

module.exports = router;
