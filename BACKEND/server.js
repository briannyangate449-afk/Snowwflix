require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./db.js");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Homepage
app.get("/", (req, res) => {
  res.send("🎬 Welcome to SNOWWFLIX!");
});

// Auth routes
app.use("/api/auth", authRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
