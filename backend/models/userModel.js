const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      min: 3,
      max: 15,
      validate: {
        validator: function (v) {
          return !/\s/.test(v);
        },
        message: (props) => `${props.value} cannot contain spaces`,
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address`,
      },
    },
    password: {
      type: String,
      required: true,
      min: 3,
    },
    name: {
      type: String,
      default: "",
    },
    problemsSolved: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: "Problem",
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Password hash middleware
userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 10);
  }
  next();
});

// Static register method
userSchema.statics.register = async function ({username, email, password}) {
  if (!username || !email || !password) {
    throw Error(
      `Missing fields: ${username ? "" : "username"} ${email ? "" : "email"} ${
        password ? "" : "password"
      }}`
    );
  }

  // We could check if the username or email already exists in the database
  // but we will leave that to the mongoose to handle
  // we will catch the mongoose error and throw a more user friendly error
  // const existingUser = await this.findOne({ $or: [{ username }, { email }] });
  // if (existingUser) {
  //   throw Error('Username or email already exists');
  // }

  try {
    const user = await this.create({ username, email, password });
    return user;
  } catch (err) {
    console.log(err);

    if (err.code === 11000) {
      // Duplicate username or email
      throw Error("Username or email already exists");
    } else {
      throw Error(err);
    }
  }
};

// Static login method
userSchema.statics.login = async function (username, password) {
  const user = await this.findOne({ username });
  if (user) {
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (isValidPassword) {
      return user;
    } else {
      throw Error("Incorrect password");
    }
  } else {
    throw Error("Incorrect username");
  }
};

// add a method to the userSchema to add a problem to the user's solved problems
userSchema.methods.addSolvedProblem = async function (problemId) {
  if (!this.problemsSolved) {
    this.problemsSolved = [problemId];
    await this.save();
  }
  else if (!this.problemsSolved.includes(problemId)) {
    this.problemsSolved.push(problemId);
    await this.save();
  }
};

module.exports = mongoose.model("User", userSchema);
