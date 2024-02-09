const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const problemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return !/\s/.test(v);
        },
        message: (props) => `${props.value} cannot contain spaces`,
      },
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
      enum: ["easy", "medium", "hard"],
    },
    likes: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: "User",
      default: [],
    },
    dislikes: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: "User",
      default: [],
    },
    tags: {
      type: [String],
      required: true,
    },
    example: {
      type: [[]], // ["input", "output", "explaination"]
      required: true,
      default: [],
      validate: {
        validator: function (v) {
          return v.every((arr) => arr.length === 3);
        },
        message: (props) => `Each sub-array should contain exactly 3 elements`,
      },
    },
    boilerPlate: {
      type: Map,
      of: String,
      required: true,
    },
    notes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// Method to run the solution against the test cases
problemSchema.methods.compareSolution = async function (language, solution) {
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

  const languageId = getLanguageId(language);
  if (languageId === -1) {
    return { error: "Language not supported" };
  }

  if (solution.trim() === "") {
    throw new Error("Solution cannot be empty");
  }

  function getFileName() {
    function getLanguageExtension(language) {
      switch (language.trim().toLowerCase()) {
        case "python":
          return "py";
        case "javascript":
          return "js";
        default:
          return "";
      }
    }
    // filename is the exaact same as problem.title except that '-' is '_'
    return (this.title.replace(/-/g, "_") + getLanguageExtension(language));
  }

  const fs = require('fs')

  fs.readFile(`../${language}/${getFileName()}`, 'utf8', function(err, driverCode) {
    console.log("It is reading the file")
    if (err) {
      console.error(err)
      throw new Error(`Tests not found`)
    }
    console.log(driverCode)
  })

  const data = {
    language_id: languageId,
    source_code: Buffer.from(solution, 'utf8').toString('base64') + driverCode,
  };

  const url =
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
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

module.exports = mongoose.model("Problem", problemSchema);
