const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./users.js");

const memeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    // type: String,
    // required: true,
    url: String,
    filename: String,
  },
  description: String,
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  mintedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  memeLevel: {
    type: String,
    enum: ["Common", "Rare", "Epic", "Legendary"],
    default: "Common",
  },
  popularityScore: {
    type: Number,
    default: 0,
  },
  category: String,
  tags: [String],
  mintedAt: {
    type: Date,
    default: Date.now,
  },
});

const Meme = mongoose.model("Meme", memeSchema);
module.exports = Meme;
