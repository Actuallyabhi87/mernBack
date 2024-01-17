const express = require("express");
const mongodb = require("./db");
const cors = require("cors");
const bodyparser = require("body-parser");
const app = express();
const path = require("path");

const port = 5000;
// app.get("/", (req, res) => res.send("Hello World!"));
app.use(cors());
app.use(express.json());
app.use(bodyparser.json());
app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OrderData"));
app.use(express.static(path.join(__dirname, "./build")));
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./build/index.html"));
});

// app.get("/", (req, res) => {
//   app.use(express.static(path.resolve(__dirname, "client", "build")));
//   res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
// });
mongodb();
app.listen(port, () => console.log(`Server Started`));
