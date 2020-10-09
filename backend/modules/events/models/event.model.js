const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const EventSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  social_media_link: {
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
