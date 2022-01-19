module.exports = (err, req, res, next) => {
  if (err.statusCode === 500) {
    res.status(500).send({ message: `На сервере произошла ошибка ${err.name}: ${err.message}` });
    return;
  }
  res.status(err.statusCode || 500).send({ message: `Произошла ошибка: ${err.message}` });
};
