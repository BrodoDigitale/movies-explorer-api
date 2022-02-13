const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const InvalidDataError = require('../errors/invalid-data-err');

// валидация ссылки
const urlValidator = (value) => {
  if (!validator.isURL(value, { require_protocol: true })) {
    throw new InvalidDataError('Поле не является ссылкой');
  }
  return value;
};

const signinValidation = celebrate(
  {
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  },
);

const signupValidation = celebrate(
  {
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  },
);

const profileUpdateValidation = celebrate(
  {
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      email: Joi.string().required().email(),
    }),
  },
);

const createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(urlValidator),
    trailer: Joi.string().required().custom(urlValidator),
    thumbnail: Joi.string().required().custom(urlValidator),
    nameRU: Joi.string().required(),
    nameEN: Joi.required(),
    movieId: Joi.number().required(),
  }),
});

const deleteMovieValidation = celebrate({
  body: Joi.object().keys({
    _id: Joi.string().length(24).hex(),
  }),
});

module.exports = {
  signupValidation,
  signinValidation,
  profileUpdateValidation,
  createMovieValidation,
  deleteMovieValidation,
};
