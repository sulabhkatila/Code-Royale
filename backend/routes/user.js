const express = require("express");
const router = express.Router();
const {
  getUserByUsername,
  getUserFriendsAndRequests,
} = require("../controllers/userController");
const requireAuth = require("../middleware/requireAuth");

router.get(
  "/friendsandrequests/:username",
  requireAuth,
  getUserFriendsAndRequests
);

router.get("/:username", getUserByUsername);

module.exports = router;
