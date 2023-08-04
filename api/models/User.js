const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 4,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  duration: {
    type: Number,
    required: true,
    default: 0,
  },
  cycle: {
    type: Number,
    required: true,
    default: 0,
  },
});
const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
