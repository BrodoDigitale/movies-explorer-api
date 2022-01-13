// рутинг
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { login } = require('../controllers/login');
const { createUser } = require('../controllers/users');
const usersRoutes = require('./users');
const moviesRoutes = require('./movies');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-err');

// логин
router.post('/signin', celebrate(
  {
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  },
), login);

// регистрация
router.post('/signup', celebrate(
  {
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  },
), createUser);

// авторизация
router.use(auth);

// роуты, защищённые авторизацией
router.use('/users', usersRoutes);
router.use('/movies', moviesRoutes);

router.use(('*', () => {
  throw new NotFoundError('Страница не найдена');
}));

module.exports = router;
