const express = require("express");
const router = express.Router();
const { getUserByUsername } = require("../controllers/userController");

router.get("/:username", getUserByUsername);

module.exports = router;
