const Problem = require("../models/problemModel");

const MAX_ITERATIONS = 5;
const WAIT_PER_ITERATION = 100;

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
};

const submitSolution = async (req, res) => {
  const problemName = req.body.problem;
  const language = req.body.language;
  const solution = req.body.solution;

  let missingFields = [];
  if (!problemName) missingFields.push("problemName");
  if (!language) missingFields.push("language");
  if (!solution) missingFields.push("solution");

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: `Missing fields: ${missingFields.join(", ")}`,
    });
  }

  function getLanguageId(language) {
    switch (language.trim().toLowerCase()) {
      case "python":
        return 92;
      case "javascript":
        return 93;
      default:
        return -1;
    }
  }

  function getFileName() {
    function getLanguageExtension(language) {
      switch (language.trim().toLowerCase()) {
        case "python":
          return ".py";
        case "javascript":
          return ".js";
        default:
          throw new Error("Language not supported");
      }
    }

    // filename is the exact same as problem.title except '-' is '_'
    return problemName.replace(/-/g, "_") + getLanguageExtension(language);
  }

  async function getTests() {
    const fs = require("fs").promises;
    const path = require("path");

    try {
      const driverCode = await fs.readFile(
        path.join(
          __dirname,
          `../tests/${language.toLowerCase()}/${getFileName()}`
        ),
        "utf8"
      );
      return driverCode;
    } catch (err) {
      console.error(err);
      throw new Error("Tests not found");
    }
  }

  ///

  const languageId = getLanguageId(language);
  if (languageId === -1) {
    return res.status(400).json({ message: "Language not supported" });
  }

  // Get the test (driver code)
  // Concatenate the solution and the test
  const tests = await getTests();
  const source_code = solution + "\n" + tests;
  const source_code_base64 = Buffer.from(source_code).toString("base64");

  console.log(source_code_base64);

  const data = {
    language_id: languageId,
    source_code: source_code_base64,
  };

  const submitCodeUrl =
    "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&fields=*";
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "Content-Type": "application/json",
      "X-RapidAPI-Key": process.env.X_RAPIDAPI_KEY,
      "X-RapidAPI-Host": process.env.X_RAPIDAPI_HOST,
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(submitCodeUrl, options);
    if (response.status !== 201) {
      throw new Error(
        "Submission failed",
        response.error ? response.error : response.message
      );
      // return res.status(response.status).json({error: "Submission failed"})
    }

    // Submission passed
    // We receive a submission token
    // Using the submission token we can get the result of the submission
    const result = await response.text();

    // Get the result of the submission
    const submissionId = JSON.parse(result).token;

    console.log("the submission id is", submissionId);

    const getSubmissionUrl = `https://judge0-ce.p.rapidapi.com/submissions/${submissionId}?base64_encoded=true&fields=*`;
    const getSubmissionOptions = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.X_RAPIDAPI_KEY,
        "X-RapidAPI-Host": process.env.X_RAPIDAPI_HOST,
      },
    };

    const getSubmission = async (iteration) => {
      if (iteration > MAX_ITERATIONS) {
        throw new Error("Submission timed out");
      }

      const response = await fetch(getSubmissionUrl, getSubmissionOptions);
      const result = await response.text();
      const status = JSON.parse(result).status.id;

      if (status <= 2) {
        // Status is either 0 or 1
        // 0: In Queue
        // 1: Processing
        // We wait and try again
        await new Promise((resolve) => setTimeout(resolve, iteration * WAIT_PER_ITERATION));
        return getSubmission(iteration + 1);
      }
      return result;
    };

    const submissionResult = await getSubmission(1);

    // compare the stdout with the expected output
    const output = decode(JSON.parse(submissionResult).stdout);
    console.log(output); // 

    const error = decode(JSON.parse(submissionResult).stderr);

    res.status(200).json(submissionResult);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

function encode(code) {
  return Buffer.from(code).toString("base64");
}

function decode(code) {
  return Buffer.from(code, "base64").toString("utf-8");
}

module.exports = {
  getProblemSet,
  getProblem,
  addProblem,
  deleteProblem,
  submitSolution,
};
