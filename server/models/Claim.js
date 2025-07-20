const mongoose = require("mongoose");
const User = require("./User");

const claimSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  pointsClaimed: {
    type: Number,
    required: true,
  },
  claimedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Claim", claimSchema);
