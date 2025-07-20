const User = require("../models/User");
const Claim = require("../models/Claim");

const addUser = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Name is required" });

    const newUser = new User({ name });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (err) {
    console.error("Add User Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

const claimPoints = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: "UserId is required" });

    const points = Math.floor(Math.random() * 10) + 1;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.totalPoints += points;
    await user.save();

    const claim = new Claim({ userId, pointsClaimed: points });
    await claim.save();

    res.status(200).json({ user, pointsClaimed: points });
  } catch (err) {
    console.error("Claim Points Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

const getLeaderBoard = async (req, res) => {
  try {
    const users = await User.find().sort({ totalPoints: -1 });

    res.status(200).json(users);
  } catch (err) {
    console.error("Leaderboard Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

const getClaimHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const history = await Claim.find({ userId }).sort({ claimedAt: -1 });

    res.status(200).json(history);
  } catch (err) {
    console.error("Claim History Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { addUser, getLeaderBoard, claimPoints, getClaimHistory };
