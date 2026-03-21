const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Validate Environment Variables
const requiredEnvVars = ["MONGO_URI", "JWT_SECRET", "PORT"];
const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error(`Error: Missing required environment variables: ${missingEnvVars.join(", ")}`);
  process.exit(1);
}

const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");

// Connect to Database
connectDB();

const app = express();

const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true,
  legacyHeaders: false,
});

// Middleware
app.use(cors());
app.use(express.json());

// Apply the rate limiting middleware to all requests
app.use(limiter);

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/food", require("./routes/foodRoutes"));
app.use("/api/request", require("./routes/requestRoutes"));

// Global Error Handler
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));