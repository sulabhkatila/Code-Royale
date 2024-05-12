const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const requireAuth = require("../middleware/requireAuth");
const {
  inviteFriendEmail,
  sendFriendRequest,
  deleteFriend,
  acceptFriendRequest,
  showAllFriends,
  showAllRequests,
} = require("../controllers/friendController");

router.post("/invite", requireAuth, inviteFriendEmail);

router.post("/add", requireAuth, sendFriendRequest);

router.delete("/delete", requireAuth, deleteFriend);

router.post("/accept", requireAuth, acceptFriendRequest);

router.get("/all", requireAuth, showAllFriends);

router.get("/requests", requireAuth, showAllRequests);

module.exports = router;