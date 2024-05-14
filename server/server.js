const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes")



const CONNECTION_STRING =
  "mongodb+srv://tosdwqj:R62V5OtpQym5dJIL@eventmanagement.k12nntp.mongodb.net/?retryWrites=true&w=majority&appName=EventManagement";

mongoose
  .connect(CONNECTION_STRING)
  .then(() => {
    console.log("Connected to DB!");
    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use("/api", routes);
    app.listen(5000, () => {
      console.log("server is up!");
    });
  })
  .catch((err) => {
    console.log(err, "Failed to connect to DB!");
  });