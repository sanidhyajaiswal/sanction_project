const express = require("express");
const router = express.Router();
const Transaction = require("../models/transaction");
const checkAuth = require("../middleware/check-auth");

router.post("", checkAuth, (req, res, next) => {
  const transaction = new Transaction({
    agencyName: req.body.agencyName,
    contractNumber: req.body.contractNumber,
    contractValue: req.body.contractValue,
    transaction: [],
    remainingBudget: req.body.remainingBudget,
  });
  console.log(transaction);
  transaction.save();
  res.status(201).json({
    message: "Transaction Entry Created",
  });
});

router.get("/:id", checkAuth, (req, res, next) => {
  Transaction.findOne({ contractNumber: req.params.id }).then((transac) => {
    if (transac) {
      res.status(200).json(transac);
    } else {
      res.status(404).json({ message: "Transactions Not Found!" });
    }
  });
});

router.post("/:id", checkAuth, (req, res, next) => {
  const event = {
    transNo: req.body.transNo,
    date: req.body.date,
    amount: req.body.amount,
  };
  Transaction.updateOne(
    { contractNumber: req.params.id },
    { $push: { transaction: event } }
  ).then((result) => {
    res.status(200).json({ message: "Updated successfully!", res: result });
  });
});

router.delete("/:id", (req, res, next) => {
  Transaction.updateOne(
    { contractNumber: "erwrtawer" },
    { $pop: { transaction: { _id: "64ce6262a285f520a395f0fd" } } }
  ).then((result) => {
    res.status(200).json({ message: "Deleted Transaction!", res: result });
  });
});

router.patch("/:id", (req, res, next) => {
  const newTran = req.body.amount;
  Transaction.updateOne({ contractNumber: req.params.id }, [
    { $set: { remainingBudget: { $subtract: ["$remainingBudget", newTran] } } },
  ]).then((result) => {
    res.status(200).json({ message: "Updated Budget!!" });
  });
});

module.exports = router;
