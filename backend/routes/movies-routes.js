const express = require("express");

const movieControllers = require("../controllers/movies-controllers");

const router = express.Router();

router.get("/:mid", movieControllers.getMovieById);
router.post("/", movieControllers.createMovie);

module.exports = router;
