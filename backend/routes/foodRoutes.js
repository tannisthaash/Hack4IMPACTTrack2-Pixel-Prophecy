const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const { createFood, getFood } = require("../controllers/foodController");

// Create food listing (restaurant only)
router.post("/", auth, createFood);

// Get all available food
router.get("/", auth, getFood);

module.exports = router;