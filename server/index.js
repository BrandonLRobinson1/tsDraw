const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// const path = require("path");
const cookieParser = require("cookie-parser");
const verifyJWT = require("./middleware/verifyJWT");
const register = require("./controllers/register");
const login = require("./controllers/logIn");

const PORT = process.env.PORT || 3100;
const connectDB = require("./config/database");

require("dotenv").config();

const app = express();

connectDB();

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// app.use(express.static(path.join(__dirname, "../client", "build")));
// app.use(express.static("public"));

app.use("/register", register);

app.use("/login", login);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(verifyJWT);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB 🦊");
  app.listen(PORT, () => console.log(`💻 Server running on port ${PORT}`));
});
