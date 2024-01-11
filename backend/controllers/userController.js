const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.register({ username, email, password });
    const token = createToken(user._id);

    res.status(200).json({ username, token });
  } catch (err) {
    if (err.message === "Username or email already exists") {
      res.status(400).json({ message: "Username or email already exists" });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.login(username, password);
    const token = createToken(user._id);
    
    res.status(200).json({ username, token });
  } catch (err) {
    if (
      err.message === "Incorrect username" ||
      err.message === "Incorrect password"
    ) {
      res.status(400).json({ message: "Incorrect username or password" });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};
