const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  rank: {
    type: Number,
    required: true,
  },
  ratings: {
    type: Number,
    required: true,
  },
  overview: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
