const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  walletAddress: {
    type: String,
    required: true,
    unique: true,
  },
  profilePic: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.plugin(passportLocalMongoose);

const Users = mongoose.model("User", userSchema);
module.exports = Users;
