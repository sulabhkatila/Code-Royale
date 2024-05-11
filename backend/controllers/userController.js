const User = require("../models/userModel");
const Friends = require("../models/friendsModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.register({ username, email, password });
    const token = createToken(user._id);

    res.status(200).json({ username, email, token });
  } catch (err) {
    console.log(err);
    if (err.message === "Username or email already exists") {
      res.status(400).json({ message: "Username or email already exists" });
    } else {
      res.status(500).json({ error: "Server Error" });
    }
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.login(username, password);
    const token = createToken(user._id);

    res.status(200).json({ username, email: user.email, token });
  } catch (err) {
    if (
      err.message === "Incorrect username" ||
      err.message === "Incorrect password"
    ) {
      res.status(400).json({ message: "Incorrect username or password" });
    } else {
      res.status(500).json({ error: "Server Error" });
    }
  }
};

const getUserByUsername = async (req, res) => {
  const username = req.params.username;

  try {
    const user = await User.findOne({
      username: username,
    });
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send("Server Error");
  }
  
  return user;
}

module.exports = { registerUser, loginUser, getUserByUsername };
