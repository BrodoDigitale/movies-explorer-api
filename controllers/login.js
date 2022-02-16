const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { NODE_ENV, SECRET_KEY_DEV, JWT_SECRET } = require('../utils/config');
const { authSuccess } = require('../utils/errors-and-messages');

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : SECRET_KEY_DEV,
        { expiresIn: '7d' },
      );
      res.send({ message: authSuccess, token, user });
    })
    .catch(next);
};

module.exports = { login };
