const express = require("express");
const router = express.Router();
const Problem = require("../models/problemModel");

router.post('/add', async (req, res) => {
  const api_key = req.query.api_key;

  if (api_key !== process.env.API_KEY) {
    return res.status(401).send("Unauthorized");
  }

  const problem = new Problem({
    name: req.body.name,
    title: req.body.title,
    description: req.body.description,
    difficulty: req.body.difficulty,
    tags: req.body.tags,
    example: req.body.example,
    boilerPlate: req.body.boiletPlate,
    notes: req.body.notes,
  });

  try {
    const savedProblem = await problem.save();
    res.status(201).json(savedProblem);
  } catch (err) {
    res.status(500).send("Server Error");
  }
})

router.delete("/delete", async (req, res) => {
  const api_key = req.query.api_key;
  const name = req.query.name;

  if (api_key !== process.env.API_KEY) {
    return res.status(401).send("Unauthorized");
  }

  try {
    const problem = await Problem.findOneAndDelete({ name: name });
    if (!problem) {
      return res.status(404).send("Problem not found");
    }
    res.status(200).json(problem);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

router.get("/:name", async (req, res) => {
  const name = req.params.name;

  try {
    const problem = await Problem.findOne({ name: name });
    if (!problem) {
      return res.status(404).send("Problem not found");
    }
    res.status(200).json(problem);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

router.post("/submit", async (req, res) => {
    const name = req.body.name;
    const language = req.body.language;
    const solution = req.body.solution;

    //

    const isSolution = Problem.compareSolution(language, solution)
    // if there is one False, then return False
    // isSolution will be an array of bools
})

module.exports = router;