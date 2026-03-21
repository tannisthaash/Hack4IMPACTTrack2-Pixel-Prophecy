const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  food: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FoodListing"
  },
  ngo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  volunteer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "completed"],
    default: "pending"
  }
}, { timestamps: true });

module.exports = mongoose.model("Request", requestSchema);