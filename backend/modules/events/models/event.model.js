const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const EventSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  improve: {
    type: String,
    required: true,
  },
  keep: {
    type: String,
    required: true,
  },
  sugestions: {
    type: String,
    required: true,
  },
  feedback: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  waiting_approval: {
    type: Boolean,
    required: true,
    default: true,
  },
});

const eventModel = model("events", EventSchema);
module.exports = eventModel;
