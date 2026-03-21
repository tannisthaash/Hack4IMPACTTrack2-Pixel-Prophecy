const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const { createRequest, updateStatus } = require("../controllers/requestController");

// NGO requests food
router.post("/", auth, createRequest);

// Update request status
router.put("/:id", auth, updateStatus);

module.exports = router;