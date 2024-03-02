const express = require("express");
const router = express.Router();
const Problem = require("../models/problemModel");
const { getProblemSet } = require("../controllers/problemController");

router.get("/", getProblemSet);

module.exports = router;