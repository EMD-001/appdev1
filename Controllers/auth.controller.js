const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Models/user.model");

// ✅ SIGN UP
const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({
        status: false,
        message: "Email or username already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({
      status: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

// ✅ SIGN IN
const signIn = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid username or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      status: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Signin error:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

module.exports = { signup, signIn };
