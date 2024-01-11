const Problem = require("../models/problemModel");

const getProblemSet = async (req, res) => {
  const { difficulty, tags } = req.query;
  let query = {};

  if (tags && difficulty) {
    const tagsArr = tags.split(",");
    query = {
      difficulty: difficulty,
      tags: { $all: tagsArr },
    };
  } else if (tags) {
    const tagsArr = tags.split(",");
    query = {
      tags: { $all: tagsArr },
    };
  } else if (difficulty) {
    query = {
      difficulty: difficulty,
    };
  }

  const problems = await Problem.find(query);
  res.json(problems);
};

const getProblem = async (req, res) => {
  const { name } = req.params;

  const problem = await Problem.findOne({ name: name });
  try {
    if (problem) {
      res.status(200).json(problem);
    } else {
      res.status(404).json({ message: "Problem not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

modeule.exports = {
  getProblemSet,
  getProblem,
};
