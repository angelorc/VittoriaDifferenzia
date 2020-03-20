var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
  chat_id: {
    type: Number,
    required: true,
    unique: true
  },
  username: String,
  name: String,
  address: String,
  wallet: String
});

module.exports = mongoose.model("User", UserSchema);