const Problem = require("../models/problemModel");

const MAX_ITERATIONS = 5;
const WAIT_PER_ITERATION = 1000;

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
    boilerPlate: req.body.boilerPlate,
    tests: req.body.tests,
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

  const getSubmission = async (url, options, iteration) => {
    if (iteration > MAX_ITERATIONS) {
      throw new Error("Submission timed out");
    }

    // When the solution is submitted
    // It is in the queue: status = 0
    // It, then goes to processing: status = 1
    // It is then processed: status = 2
    // To ensure we don't make too many requests
    // We wait for some time before checking the status
    await new Promise((resolve) =>
      setTimeout(resolve, iteration * WAIT_PER_ITERATION)
    );

    const response = await fetch(url, options);
    const result = await response.text();
    const status = JSON.parse(result).status.id;

    if (status <= 2) {
      // The submission is still in the queue or processing
      return getSubmission(url, options, iteration + 1);
    }
    return result;
  };


  function encode(code) {
    return Buffer.from(code).toString("base64");
  }

  function decode(code) {
    return Buffer.from(code, "base64").toString("utf-8");
  }
  
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

  const problem = await Problem.findOne({ name: problemName });
  if (!problem) {
    return res.status(404).json({ message: "Problem not found" });
  }
  
  const languageId = getLanguageId(language);
  if (languageId === -1) {
    return res.status(400).json({ message: "Language not supported" });
  }

  // Get the test (driver code)
  // Concatenate the solution and the test
  const tests = await problem.getDriverCode(language);
  const source_code = solution + "\n" + tests;
  const source_code_base64 = encode(source_code);

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
      const result = await response.json();
      return res.status(response.status).json({
        error: `Submission failed: ${result.error}`,
        message: `${result.message}`,
      });
    }

    // The code has been submitted and put in queue
    // We receive a submission token
    // Using the submission token we can get the result of the submission
    const result = await response.text();
    const submissionId = JSON.parse(result).token;

    const getSubmissionUrl = `https://judge0-ce.p.rapidapi.com/submissions/${submissionId}?base64_encoded=true&fields=*`;
    const getSubmissionOptions = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.X_RAPIDAPI_KEY,
        "X-RapidAPI-Host": process.env.X_RAPIDAPI_HOST,
      },
    };

    const submissionResult = await getSubmission(
      getSubmissionUrl,
      getSubmissionOptions,
      1
    );
    const parsedResult = JSON.parse(submissionResult);

    // compare the stdout with the expected output
    const output = parsedResult.stdout ? decode(parsedResult.stdout) : null;
    const error = parsedResult.stderr ? decode(parsedResult.stderr) : null;
    parsedResult.stdout = output ? output.trim().split("\n") : null;
    parsedResult.stderr = error;
    console.log("the parsed result is ", parsedResult);

    res.status(200).json(parsedResult);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: `Server Error: ${err.error}`, message: err.message });
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
};

module.exports = {
  getProblemSet,
  getProblem,
  addProblem,
  deleteProblem,
  submitSolution,
};
