const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  transNo: { type: String },
  date: { type: String },
  amount: { type: Number },
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
