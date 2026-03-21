const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Register
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role, location } = req.body;

    // Validation
    if (!name || !email || !password || !role) {
      res.status(400);
      throw new Error("Please add all required fields");
    }

    if (!emailRegex.test(email)) {
      res.status(400);
      throw new Error("Please enter a valid email");
    }

    if (password.length < 6) {
      res.status(400);
      throw new Error("Password must be at least 6 characters");
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashed,
      role,
      location
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        location: user.location,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (err) {
    next(err);
  }
};

// Login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate request
    if (!email || !password) {
      res.status(400);
      throw new Error("Please add email and password");
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400);
      throw new Error("User not found");
    }

    // Check credentials
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400);
      throw new Error("Invalid credentials");
    }

    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      location: user.location,
      token: generateToken(user._id),
    });
  } catch (err) {
    next(err);
  }
};