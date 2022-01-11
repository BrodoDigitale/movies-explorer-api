const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const InvalidDataError = require('../errors/invalid-data-err');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies);
router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().alphanum().length(24),
  }),
}), deleteMovie);
router.post('/', celebrate(
  {
    body: Joi.object().keys({
      country: Joi.string().required().min(2),
      director: Joi.string().required().min(2),
      duration: Joi.number().required(),
      year: Joi.number().required(),
      description: Joi.string(),
      image: Joi.string().required().custom((value) => {
        if (!validator.isURL(value, { require_protocol: true })) {
          throw new InvalidDataError('Поле не является ссылкой');
        }
        return value;
      }),
      trailer: Joi.string().required().custom((value) => {
        if (!validator.isURL(value, { require_protocol: true })) {
          throw new InvalidDataError('Поле не является ссылкой');
        }
        return value;
      }),
      thumbnail: Joi.string().required().custom((value) => {
        if (!validator.isURL(value, { require_protocol: true })) {
          throw new InvalidDataError('Поле не является ссылкой');
        }
        return value;
      }),
      nameRU: Joi.string().required().min(2).max(30),
      nameEN: Joi.string().required().min(2).max(30),
    }),
  },
), createMovie);

module.exports = router;
