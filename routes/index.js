// рутинг
const router = require('express').Router();
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-err');

// роуты регистрации и логина
router.use(require('./auth'));

// роуты, защищённые авторизацией
router.use(auth, require('./users'));
router.use(auth, require('./movies'));

router.use(('*', () => {
  throw new NotFoundError('Страница не найдена');
}));

module.exports = router;
