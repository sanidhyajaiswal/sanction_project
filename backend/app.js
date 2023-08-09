const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const dataRoutes = require("./routes/data");
const userRoutes = require("./routes/user");
const projectRoutes = require("./routes/projects");
const transactionRoutes = require("./routes/transaction");
const norouteRoutes = require("./routes/noroute");

mongoose
  .connect("mongodb://127.0.0.1:27017/sanction")
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With,Content-Type,Accept, Authorization",
    "Access-Control-Allow-Origin"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, PATCH, PUT, OPTIONS"
  );
  next();
});

app.use((req, res, next) => {
  console.log("New Req");
  next();
});

app.use("/data", dataRoutes);
app.use("/transaction", transactionRoutes);
app.use("/api/user", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/noroute", norouteRoutes);

module.exports = app;
