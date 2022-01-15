const router = require('express').Router();
const { login } = require('../controllers/login');
const { createUser } = require('../controllers/users');
const { signinValidation, signupValidation } = require('../middlewares/validation');

// логин
router.post('/signin', signinValidation, login);

// регистрация
router.post('/signup', signupValidation, createUser);

module.exports = router;
