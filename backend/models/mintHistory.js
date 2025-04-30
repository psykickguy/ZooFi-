const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mintHistorySchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  memeId: {
    type: Schema.Types.ObjectId,
    ref: "Meme",
    required: true,
  },
  transactionHash: {
    type: String,
    required: true,
    unique: true,
  },
  mintedAt: {
    type: Date,
    default: Date.now,
  },
  network: {
    type: String,
    enum: ["Sui", "Ethereum", "Polygon", "Other"],
    default: "Sui",
  },
});

const mintHistory = mongoose.model("MintingRecord", mintHistorySchema);
module.exports = mintHistory;
