const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth-error');
const { NODE_ENV, SECRET_KEY_DEV, JWT_SECRET } = require('../utils/config');
const { authErrorMsg } = require('../utils/errors-and-messages');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError(authErrorMsg);
  }
  const token = authorization.replace('Bearer ', '');

  let payload;
  try {
    const key = NODE_ENV === 'production' ? JWT_SECRET : SECRET_KEY_DEV;
    payload = jwt.verify(token, key);
  } catch (err) {
    throw new AuthError(authErrorMsg);
  }
  req.user = payload;
  next();
};
