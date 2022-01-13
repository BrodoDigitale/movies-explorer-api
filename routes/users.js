const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const InvalidDataError = require('../errors/invalid-data-err');

const {
  getCurrentUser,
  updateProfile,
} = require('../controllers/users');

router.get('/me', getCurrentUser);

router.patch('/me', celebrate(
  {
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      password: Joi.string().min(2).max(30),
      email: Joi.string().custom((value) => {
        if (!validator.isEmail(value, { require_protocol: true })) {
          throw new InvalidDataError('Неккоректно введен емейл');
        }
        return value;
      }),
    }),
  },
), updateProfile);

module.exports = router;
