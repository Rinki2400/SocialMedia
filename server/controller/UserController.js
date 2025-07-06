const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/UserModel");

const JWT_SECRET = process.env.JWT_SECRET;

// Sign Up
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ email: user.email, id: user._id }, JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({ result: user, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Sign In
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: user.email, id: user._id }, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ result: user, token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
