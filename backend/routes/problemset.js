const express = require("express");
const router = express.Router();
const Problem = require("../models/problemModel");

router.get("/", async (req, res) => {
  const difficulty = req.query.difficulty;
  const tags = req.query.tags ? req.query.tags.split(",") : [];

  try {
    let problems;
    if (difficulty && tags.length > 0) {
      problems = await Problem.find({
        difficulty: difficulty,
        tags: { $all: tags },
      });
    } else if (difficulty) {
      problems = await Problem.find({ difficulty: difficulty });
    } else if (tags.length > 0) {
      problems = await Problem.find({ tags: { $all: tags } });
    } else {
      problems = await Problem.find();
    }
    res.status(200).json(problems);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});