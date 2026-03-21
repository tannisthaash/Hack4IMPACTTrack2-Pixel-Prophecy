const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  title: String,
  quantity: String,
  expiryTime: Date,
  location: {
    lat: Number,
    lng: Number
  },
  status: {
    type: String,
    enum: ["available", "claimed"],
    default: "available"
  }
}, { timestamps: true });

module.exports = mongoose.model("FoodListing", foodSchema);