const express = require("express");
// const path = require("path");

const app = express();

// serve static files
// app.use(express.static(path.join(__dirname, "../client", "build")));
// app.use(express.static("public"));

const PORT = process.env.PORT || 3100;

app.listen(PORT, () => console.log(`💻 Server running on port ${PORT}`));
