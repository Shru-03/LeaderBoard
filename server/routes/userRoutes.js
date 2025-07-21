const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  addUser,
  claimPoints,
  getClaimHistory,
  getLeaderBoard,
} = require("../controllers/userController");

router.post("/user", upload.single("image"), addUser);

router.post("/claim", claimPoints);

router.get("/leaderboard", getLeaderBoard);

router.get("/history/:userId", getClaimHistory);

module.exports = router;
