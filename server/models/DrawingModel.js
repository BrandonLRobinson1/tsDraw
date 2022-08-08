const mongoose = require("mongoose");

const { Schema } = mongoose;

const drawingSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  viewType: {
    type: String,
    required: true,
  },
  createTime: {
    type: String,
    required: true,
  },
  creationDate: {
    type: String,
    required: true,
  },
  timeToCreate: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Drawing", drawingSchema);
