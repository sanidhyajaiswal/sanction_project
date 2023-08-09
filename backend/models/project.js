const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  agencyName: { type: String, required: true },
  contractNumber: { type: String, required: true },
  quantity: { type: String },
  modeofPayment: { type: String, required: true },
  contractValue: { type: Number, required: true },
  billingCycle: { type: String, required: true },
  bankGuarantee: { type: Boolean, required: true },
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
