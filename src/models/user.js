var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
  chat_id: {
    type: Number,
    required: true,
    unique: true
  },
  username: String,
  first_name: String,
  last_name: String,
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);