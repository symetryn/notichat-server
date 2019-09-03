const express = require("express");
const bodyParser = require("body-parser");
const pushController = require("./controller/pushController");

const app = express();

const mongoose = require("mongoose");

const config = require("./config/config.js");
const firebase = require("firebase-admin");

const serviceAccount = require("./config/notichat-167a0-firebase-adminsdk-v1nw8-8bb251bf15.json");
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://notichat-167a0.firebaseio.com"
});
app.use(bodyParser.json());

app.post("/api/push", pushController.sendNotification);
app.post("/api/user-key", pushController.addUserKey);

app.get("/api/user-key", pushController.getUserKey);

mongoose
  .connect(config.mongoUrl)
  .then(result => {
    app.listen(process.env.PORT || config.port, "0.0.0.0", () => {
      console.log(`Server running on port ${config.port}`);
    });
  })
  .catch(err => {
    console.log(err);
  });
