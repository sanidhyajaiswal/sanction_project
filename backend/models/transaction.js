const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  transNo: { type: String },
  date: { type: String },
  amount: { type: Number },
});

const transactionSchema = new mongoose.Schema({
  agencyName: { type: String, required: true },
  contractNumber: { type: String, required: true, unique: true },
  contractValue: { type: Number, required: true },
  transaction: [eventSchema],
  remainingBudget: { type: Number, required: true },
});

const Event = mongoose.model("Event", eventSchema);
const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
