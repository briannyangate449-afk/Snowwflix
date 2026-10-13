const express = require("express");
const router = express.Router();

const { getMovies } = require("../controllers/moviecontroller");

router.get("/", getMovies);

module.exports = router;
