const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const InvalidDataError = require('../errors/invalid-data-err');
const AccessDeniedError = require('../errors/forbidden-err');
const {
  moviesNotFound,
  movieNotFound,
  movieDelSuccess,
  movieDeletionIsForbidden,
  invalidData,
  invalidId,
} = require('../utils/errors-and-messages');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .orFail(new NotFoundError(moviesNotFound))
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .orFail(new NotFoundError(movieNotFound))
    .then((movie) => {
      if (req.user._id.toString() === movie.owner.toString()) {
        return movie.delete()
          .then(() => res.status(200).send({ message: movieDelSuccess }));
      }
      throw new AccessDeniedError(movieDeletionIsForbidden);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new InvalidDataError(invalidId));
      } else {
        next(err);
      }
    });
};

module.exports.createMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    owner,
    movieId,
  })
    .then((movie) => res.status(200).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new InvalidDataError(invalidData));
      } else {
        next(err);
      }
    });
};
