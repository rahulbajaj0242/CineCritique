const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();
const Movie = require('./../models/movies');
const auth = require('./../auth/auth');

//adding the movie into the database from information thorugh user and moviedb API
router.post('/movies/search', auth, async (req, res) => {
  const api_url = `https://api.themoviedb.org/3/search/movie?query=${req.body.title}&api_key=f6b4f4edd450d5f6012443f93bc9ae5f`;
  const response = await fetch(api_url);
  const json = await response.json();
  if (json.results.length === 0) {
    return res.status(400).send('please provide correct title');
  }

  const movieWithSameRank = await Movie.findOne({
    rank: req.body.rank,
    owner: req.user._id,
  });
  if (movieWithSameRank)
    return res.send('A movie with this rank exits in your database');

  const movie = {
    title: json.results[0].original_title,
    rank: req.body.rank,
    ratings: json.results[0].vote_average,
    overview: json.results[0].overview,
    owner: req.user._id,
  };

  const newMovie = new Movie(movie);

  try {
    await newMovie.save();
    res.status(201).send(newMovie);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/movies/me', auth, async (req, res) => {
  try {
    const movies = await Movie.find({
      owner: req.user._id,
    }).sort('rank');
    res.send(movies);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch('/movies/:id', auth, async (req, res) => {
  const movie = await Movie.findOne({
    _id: req.params.id,
    owner: req.user._id,
  });

  if (!movie) return res.status(404).send('No movie exists with this id');

  movie.rank = req.body.rank;

  try {
    await movie.save();
    res.send(movie);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/movies/:id', auth, async (req, res) => {
  try {
    const movie = await Movie.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!movie) return res.status(404).send('No movie exists with this id');
    res.send(movie);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
