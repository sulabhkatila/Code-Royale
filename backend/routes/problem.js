const express = require("express");
const router = express.Router();
const Problem = require("../models/problemModel");
const requireAuth = require("../middleware/requireAuth");
const { getProblem, addProblem, deleteProblem } = require("../controllers/problemController");
const requireApiKey = require("../middleware/requireApiKey");

router.post("/add", requireApiKey, addProblem);

router.delete("/delete", requireApiKey, deleteProblem);

router.get("/:name", getProblem);

router.post("/submit", requireAuth, async (req, res) => {
  const name = req.body.name;
  const language = req.body.language;
  const solution = req.body.solution;

  //

  const isSolution = Problem.compareSolution(language, solution);
  // if there is one False, then return False
  // isSolution will be an array of bools
});

module.exports = router;
