const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  // drawing: {
  //   drawingData: String,
  //   private: Boolean,
  //   time: String,
  //   required: false
  // }
  // refreshToken: String,
});

module.exports = mongoose.model("User", userSchema);
