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
    res.status(500).json({ error: "Server Error" });
  }
};

const addProblem = async (req, res) => {
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
    res.status(500).send(err.message);
  }
};

const deleteProblem = async (req, res) => {
  const name = req.query.name;

  try {
    const problem = await Problem.findOneAndDelete({ name });
    if (!problem) {
      return res.status(404).send("Problem not found");
    }
    res.status(200).json(problem);
  } catch (err) {
    res.status(500).send("Server Error");
  }
}

const submitSolution = async (req, res) => {
  const problemName = req.body.problem;
  const language = req.body.language;
  const solution = req.body.solution;

  try {
    const problem = Problem.findOne({ name: problemName });

    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    const result = problem.compareSolution(language, solution);

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = {
  getProblemSet,
  getProblem,
  addProblem,
  deleteProblem,
  submitSolution,
};
