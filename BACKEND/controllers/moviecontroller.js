const Movie = require("../models/movies");

// GET /api/movies
const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.json(movies);
  } catch (error) {
    console.error("Get movies error:", error);
    res.status(500).json({
      message: "Failed to fetch movies",
      error: error.message,
    });
  }
};

// Optional: Add more later (create, update, delete)
// const createMovie = async (req, res) => { ... }

module.exports = {
  getMovies,
};
