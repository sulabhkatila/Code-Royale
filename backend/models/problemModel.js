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
    switch (language.toLowerCase()) {
      case "python":
        return 92;
        break
      case "javascript":
        return 93;
        break
      default:
        return -1;
        break
    }
  }

  const languageId = getLanguageId(language);
  if (languageId === -1) {
    return { error: "Language not supported" };
  }

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
    body: {
      language_id: languageId,
      source_code:
        "I2luY2x1ZGUgPHN0ZGlvLmg+CgppbnQgbWFpbih2b2lkKSB7CiAgY2hhciBuYW1lWzEwXTsKICBzY2FuZigiJXMiLCBuYW1lKTsKICBwcmludGYoImhlbGxvLCAlc1xuIiwgbmFtZSk7CiAgcmV0dXJuIDA7Cn0=",
      stdin: "SnVkZ2Uw",
    },
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
