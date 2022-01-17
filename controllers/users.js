const bcrypt = require('bcryptjs');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const InvalidDataError = require('../errors/invalid-data-err');
const DataBaseError = require('../errors/dataBase-err');
const {
  userEmailConflict,
  userNotFound,
  invalidData,
} = require('../utils/errors-and-messages');

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => res.status(200).send({
      name: user.name,
      email: user.email,
      _id: user._id,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new InvalidDataError(invalidData);
      }
      if (err.code === 11000) {
        throw new DataBaseError(userEmailConflict);
      }
      return next(err);
    })
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError(userNotFound))
    .then((user) => res.status(200).send({ name: user.name, email: user.email }))
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .orFail(new NotFoundError(userNotFound))
    .then((user) => {
      res.send({ name: user.name, email: user.email });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new InvalidDataError(invalidData);
      }
      if (err.code === 11000) {
        throw new DataBaseError(userEmailConflict);
      }
      return next(err);
    })
    .catch(next);
};
