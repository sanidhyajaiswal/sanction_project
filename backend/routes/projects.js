const express = require("express");
const router = express.Router();
const Project = require("../models/project");
const checkAuth = require("../middleware/check-auth");

router.get("", checkAuth, (req, res, next) => {
  Project.find().then((documents) => {
    res.status(200).json({ projects: documents });
  });
});

router.post("", checkAuth, (req, res, next) => {
  const project = new Project({
    agencyName: req.body.agencyName,
    contractNumber: req.body.contractNumber,
    quantity: req.body.quantity,
    modeofPayment: req.body.modeofPayment,
    contractValue: req.body.contractValue,
    billingCycle: req.body.billingCycle,
    bankGuarantee: true,
  });
  console.log(project);
  project.save();
  res.status(201).json({
    message: "Project added successfully",
  });
});

router.put("/:id", checkAuth, (req, res, next) => {
  console.log(req);
  const project = new Project({
    _id: req.body._id,
    agencyName: req.body.agencyName,
    contractNumber: req.body.contractNumber,
    quantity: req.body.quantity,
    modeofPayment: req.body.modeofPayment,
    contractValue: req.body.contractValue,
    billingCycle: req.body.billingCycle,
    bankGuarantee: true,
  });
  Project.updateOne({ _id: req.params.id }, project).then((result) => {
    res.status(200).json({ message: "Updated successfully!" });
  });
});

router.get("/:id", checkAuth, (req, res, next) => {
  Project.findById(req.params.id).then((project) => {
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ message: "Post Not Found" });
    }
  });
});

router.delete("/:id", checkAuth, (req, res, next) => {
  const id = req.params.id;
  Project.deleteOne({ _id: id }).then((result) => {
    res.status(200).json({ message: "Project Deleted" });
  });
});

module.exports = router;
