const mongodb = require("mongodb");
const express = require("express");
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const router = express.Router();
eval(
  `Grid.prototype.findOne = ${Grid.prototype.findOne
    .toString()
    .replace("nextObject", "next")}`
);

const connection = mongoose.connection;

router.get("/", async (req, res) => {
  if (req.query.email) {
    var id = "6234702d65800a8ba08d08f8";

    const gridfsBucket = new mongoose.mongo.GridFSBucket(
      mongoose.connection.db,
      {
        bucketName: `uploads-${req.query.email}`,
      }
    );

    gfs = Grid(connection.db, mongoose.mongo);

    gfs
      .collection(`uploads-${req.query.email}`)
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
