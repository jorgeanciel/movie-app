const express = require("express");
const movieRouter = require("./movie.route");
const actorRouter = require("./actor.route");
const directorRouter = require("./director.route");
const genreRouter = require("./genre.route");
const router = express.Router();

// colocar las rutas aquí
router.use("/movies", movieRouter);
router.use("/actors", actorRouter);
router.use("/directors", directorRouter);
router.use("/genres", genreRouter);

module.exports = router;
