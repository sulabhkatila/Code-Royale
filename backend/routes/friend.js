const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const requireAuth = require("../middleware/requireAuth");
const {
  inviteFriendEmail,
  sendFriendRequest,
  deleteFriend,
  acceptFriendRequest,
} = require("../controllers/friendController");

router.post("/invite", requireAuth, inviteFriendEmail);

router.post("/add", requireAuth, sendFriendRequest);

router.delete("/delete", requireAuth, deleteFriend);

router.get("/all", requireAuth, acceptFriendRequest);

module.exports = router;