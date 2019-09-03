const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userKeysSchema = new Schema({
  fullName: {
    type: String,
    required: true
  },
  key: {
    type: String,
    required: true
  }
});
module.exports = mongoose.model("userKeys", userKeysSchema);
