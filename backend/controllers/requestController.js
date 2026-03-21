const Request = require("../models/Request");

exports.createRequest = async (req, res, next) => {
  try {
    if (!req.body.food) {
      res.status(400);
      throw new Error("Food ID is required");
    }

    const request = await Request.create({
      ...req.body,
      ngo: req.user._id // Map to user id
    });
    
    res.status(201).json(request);
  } catch (err) {
    next(err);
  }
};

// Update Status
exports.updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!status) {
      res.status(400);
      throw new Error("Please provide a status to update");
    }

    const request = await Request.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!request) {
      res.status(404);
      throw new Error("Request not found");
    }

    res.json(request);
  } catch (err) {
    next(err);
  }
};