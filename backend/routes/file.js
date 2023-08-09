const express = require("express");
const _router = express.Router();
const multer = require("multer");

const store = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, Date.now() + "." + file.originalname);
  },
});

const upload = multer({ storage: store }).single("file");

_router.post("/upload", function (req, res, next) {
  upload(req, res, function (err) {
    if (err) {
      return res.status(501).json({ error: err });
    }
    //do all database record saving activity
    return res.json({
      originalname: req.file.originalname,
      uploadname: req.file.filename,
    });
  });
});
