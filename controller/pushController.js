const mongoose = require("mongoose");
const firebase = require("firebase-admin");
const userKeys = require("../model/userkeys");

exports.sendNotification = (req, res, next) => {
  // const serviceAccount = require("../config/hamrokart-e9166-firebase-adminsdk-mw4t2-18d25c2865.json");
  console.log(req.body);
  // The Firebase token of the device which will get the notification
  // It can be a string or an array of strings
  //   Subscription.find({}).then(result => {
  //     console.log(result);
  //     let firebaseToken = result[0].mobileSubscription;
  //     let webSubscriptions = result[0].desktopSubscription;
  //     console.log(firebaseToken);
  const firebaseToken = [
    "dZZwdxsSGTc:APA91bGOeoCcvcy9tqXbhPqeQXGFF35zKh175l4O2daMGlk_2-aHAlBSM-fomAwhYrlroWmINXeF9TFxA2LkfpPVCDteINqDm8PH8HyzxnfUytYVVTHK45BnOWHrPWBvjEAlXIVP3o9z"
    // "cktg4e0WSyw:APA91bGOY1uVu3T0jASNeudNAJrCY5ZQM1JjHDMKrXv5gqCqN1EOlvFhNc3N8VBZj5G0G9wVKO9Lh_QpoZRSHWHIsUxpEfOGurj4zAljQsS7qxbn_jcfvKtBIBOfmAHPPKKMqUBY45Lr"
  ];
  const payload = {
    notification: {
      title: req.body.title,
      body: req.body.message
    }
  };

  const options = {
    priority: "high",
    timeToLive: 60 * 60 * 24 // 1 day
  };

  firebase
    .messaging()
    .sendToDevice(firebaseToken, payload, options)
    .then(status => {
      console.log(status);
      console.log(status.results);
      res.status(200).json({ message: "notification sent" });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "error", error: err });
    });
  //     this.createDesktopNotification();

  //   });
};

exports.addUserKey = (req, res, next) => {
  const fullname = req.body.name;
  const key = req.body.key;
  new userKeys({ fullName: fullname, key: key })
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({ message: "user key added" });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
};

exports.getUserKey = (req, res, next) => {
  userKeys
    .find({})
    .then(data => {
      res.status(200).json({ message: "user retrieved", data: data });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
};
