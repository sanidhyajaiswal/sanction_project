const express = require("express");
const router = express.Router();
const Project = require("../models/project");
const checkAuth = require("../middleware/check-auth");
const Transaction = require("../models/transaction");

router.get("/:id", (req, res, next) => {
  Project.findOne({ contractNumber: req.params.id }).then((project) => {
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ message: "Post Not Found" });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  Transaction.deleteOne({ contractNumber: req.params.id }).then((result) => {
    res.status(200).json({ message: "Project Deleted" });
  });
});

router.patch("/:id", (req, res, next) => {
  const newTran = req.nody.amount;
  Transaction.updateOne({ contractNumber: req.params.id }, [
    { $set: { remainingBudget: { $add: ["$remainingBudget", newTran] } } },
  ]).then((result) => {
    res.status(200).json({ message: "Restored Budget!!" });
  });
});

module.exports = router;
