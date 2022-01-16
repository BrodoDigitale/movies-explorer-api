const { celebrate, Joi } = require('celebrate');

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
      name: Joi.string().min(2).max(30),
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

module.exports = { signupValidation, signinValidation, profileUpdateValidation };
