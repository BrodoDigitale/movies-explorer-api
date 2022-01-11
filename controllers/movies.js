const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const InvalidDataError = require('../errors/invalid-data-err');
// const AccessDeniedError = require('../errors/forbidden-err');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .orFail(new NotFoundError('Фильмы не найдены'))
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .orFail(new NotFoundError('Фильм не найден'))
    .then((movie) => {
      movie.delete();
      res.status(200).send({ message: 'Фильм удален' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new InvalidDataError('Невалидный id'));
      }
      next(err);
    });
};

module.exports.createMovie = (req, res, next) => {
  Movie.create(
    req.body.country,
    req.body.director,
    req.body.duration,
    req.body.year,
    req.body.description,
    req.body.image,
    req.body.trailer,
    req.body.nameRU,
    req.body.nameEN,
    req.body.thumbnail,
  )
    .then((movie) => res.status(200).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new InvalidDataError('Введены некорректные данные'));
      }
      next(err);
    });
};
