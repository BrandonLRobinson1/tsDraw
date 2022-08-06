const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// const path = require("path");
const PORT = process.env.PORT || 3100;
const connectDB = require("./config/database");

require("dotenv").config();

const app = express();

// serve static files
// app.use(express.static(path.join(__dirname, "../client", "build")));
// app.use(express.static("public"));

// Connect to MongoDB
connectDB();

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB 🦊");
  app.listen(PORT, () => console.log(`💻 Server running on port ${PORT}`));
});
