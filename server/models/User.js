const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      default: "",
    },
    totalPoints: {
      type: Number,
      default: 0,
    },
  },
  {
    timeStamp: true,
  }
);

module.exports = mongoose.model("User", userSchema);
