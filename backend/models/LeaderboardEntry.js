const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const leaderboardEntrySchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  score: {
    type: Number,
    default: 0,
  },
  totalMints: {
    type: Number,
    default: 0,
  },
  viralScore: {
    type: Number,
    default: 0,
  },
  lastActive: {
    type: Date,
    default: Date.now,
  },
});

const LeaderboardEntry = mongoose.model(
  "LeaderboardEntry",
  leaderboardEntrySchema
);
module.exports = LeaderboardEntry;
