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
problemSchema.methods.compareSolution = function (language, solution) {
  // TODO: -- Judge0 API --
  return true;
};

module.exports = mongoose.model("Problem", problemSchema);
