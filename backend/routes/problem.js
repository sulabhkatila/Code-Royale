const express = require("express");
const router = express.Router();
const Problem = require("../models/problemModel");
const requireAuth = require("../middleware/requireAuth");
const {
  getProblem,
  addProblem,
  deleteProblem,
  submitSolution,
} = require("../controllers/problemController");
const requireApiKey = require("../middleware/requireApiKey");

router.post("/add", requireApiKey, addProblem);

router.delete("/delete", requireApiKey, deleteProblem);

router.get("/:name", getProblem);

router.post("/submit", requireAuth, submitSolution);

module.exports = router;
