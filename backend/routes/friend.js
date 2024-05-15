const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const requireAuth = require("../middleware/requireAuth");
const {
  sendFriendRequest,
  cancelFriendRequest,
  rejectFriendRequest,
  acceptFriendRequest,
  deleteFriend,
  inviteFriendEmail,
  showAllFriends,
  showAllRequests
} = require("../controllers/friendController");

// add, cancel, reject, accept, and delete
router.post("/add", requireAuth, sendFriendRequest);
router.delete("/cancel", requireAuth, cancelFriendRequest);
router.post("/reject", requireAuth, rejectFriendRequest);
router.post("/accept", requireAuth, acceptFriendRequest);
router.delete("/delete", requireAuth, deleteFriend);


router.post("/invite", requireAuth, inviteFriendEmail);

router.get("/all/:username", showAllFriends);

router.get("/requests", requireAuth, showAllRequests);

module.exports = router;