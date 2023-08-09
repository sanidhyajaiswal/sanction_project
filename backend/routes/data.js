const express = require("express");
const router = express.Router();
const Project = require("../models/project");

router.get("/piedata", (req, res, next) => {
  Project.find({}, { agencyName: 1, _id: 1, contractValue: 1 }).then(
    (documents) => {
      res.status(200).json(documents);
    }
  );
});

module.exports = router;
