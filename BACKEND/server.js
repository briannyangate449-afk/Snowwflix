require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./db.js");

// Routes
const authRoutes = require("./routes/auth");
const movieRoutes = require("./routes/movies");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Homepage
app.get("/", (req, res) => {
  res.send("🎬 Welcome to SNOWWFLIX!");
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
