const express = require("express");
const path = require("path");
const crypto = require("crypto");
const mongoose = require("mongoose");
const multer = require("multer");
const gridFs = require("multer-gridfs-storage");
const grid = require("gridfs-stream");
const router = express.Router();

const storage = new gridFs.GridFsStorage({
  url: "mongodb://127.0.0.1:27017/myunicallingDB",
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buff) => {
        if (err) {
          return reject(err);
        }
        const filename = buff.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          metadata: {
            user: req.body.email,
          },
          filename: filename,
          bucketName: `student-documents`,
        };
        resolve(fileInfo);
      });
    });
  },
});
const upload = multer({ storage });

router.post("/document-upload", upload.single("file"), (req, res) => {
  let gfs;
  mongoose.connection.once("open", () => {
    gfs = grid(mongoose.connection.db, mongoose.mongo);
    gfs.collection(`student-documents`);
  });
  res
    ? res.json({ file: req.file, user: req.body.email })
    : res.status(500).send("Something went wrong");
});

module.exports = router;
