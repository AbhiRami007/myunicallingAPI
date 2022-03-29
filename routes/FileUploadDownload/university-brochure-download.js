const mongodb = require("mongodb");
const express = require("express");
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const { University } = require("../../models/universityModel");
const router = express.Router();
eval(
  `Grid.prototype.findOne = ${Grid.prototype.findOne
    .toString()
    .replace("nextObject", "next")}`
);

const connection = mongoose.connection;

router.get("/download", async (req, res) => {
  if (req.query.university_name) {
    const university = await University.findOne({
      metadata: { university: req.query.university_name },
    });
    var id = university._id;

    const gridfsBucket = new mongoose.mongo.GridFSBucket(
      mongoose.connection.db,
      {
        bucketName: `university-brochure-${req.query.university_name}`,
      }
    );

    gfs = Grid(connection.db, mongoose.mongo);

    gfs
      .collection(`university-brochure-${req.query.university_name}`)
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
