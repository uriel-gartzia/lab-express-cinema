const express = require("express");
const router = express.Router();

const Movies = require("../models/Movie.model.js");

/* GET home page */
router.get("/", (req, res, next) => res.render("index"));

router.get("/movies", (req, res, next) => {
  Movies.find()
    //el select filtra las propiedades que quiero imprimir en la terminal para ganar en eficiencia
    //usa el lenguaje de mongo db
    .select({ title: 1, image: 1 })
    .then((allMovies) => {
      console.log(allMovies);
      res.render("movies.hbs", { moviesArr: allMovies });
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/movies/:id", (req, res, next) => {
  Movies.findById({_id: req.params.id})
  .then((oneMovie) => {
    console.log(oneMovie)
    res.render("movie-details.hbs", { movieDetails: oneMovie})
  })
  .catch((error) => {
    next(error)
  })
});

module.exports = router;
