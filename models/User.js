const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  token: {
    type: String,
  },
  avatar: {
    type: Object,
    default: {},
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
