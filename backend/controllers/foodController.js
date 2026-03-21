const Food = require("../models/FoodListing");

// Create Food
exports.createFood = async (req, res, next) => {
  try {
    if (!req.body.title || !req.body.quantity) {
      res.status(400);
      throw new Error("Please fill out all required fields");
    }

    const food = await Food.create({
      ...req.body,
      restaurant: req.user._id // Assuming req.user is populated from authMiddleware
    });
    res.status(201).json(food);
  } catch (err) {
    next(err);
  }
};

// Get Nearby Food
exports.getFood = async (req, res, next) => {
  try {
    const foods = await Food.find({ status: "available" }).populate("restaurant", "-password");
    res.json(foods);
  } catch (err) {
    next(err);
  }
};