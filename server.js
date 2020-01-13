const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const port = 80;
const user = require("./routes/user");
const dotenv = require("dotenv").config();
require("./database");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/json" }));

app.get("/", (req, res) => res.json({ message: "USERS API WORKS!" }));

app
  .route("/user")
  .get(user.getUsers)
  .post(user.postUser);
app
  .route("/user/:id")
  .get(user.getUser)
  .delete(user.deleteUser)
  .put(user.updateUser);

app.listen(port);
console.log("Listening on port " + port);

module.exports = app; // for testing
