const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const requireAuth = require("../middleware/requireAuth");
const {
  inviteFriend,
  addFriend,
  deleteFriend,
  getFriends,
} = require("../controllers/friendController");

router.post("/invite", requireAuth, inviteFriend);

router.post("/add", requireAuth, addFriend);

router.delete("/delete", requireAuth, deleteFriend);

router.get("/all", requireAuth, getFriends);