const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const corsValidator = require('./middlewares/cors-validator');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/index');

const { PORT = 3001 } = process.env;
const app = express();
app.use(cookieParser());

// Парсер данных
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// подключение к серверу mongo
mongoose.connect('mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
});
// рутинг
app.use(router);

// логгер запросов
app.use(requestLogger);

// логгер ошибок (! до обработчиков ошибок)
app.use(errorLogger);
app.use(corsValidator);

// обработка ошибок celebrate
app.use(errors());

// централизованный обработчик ошибок

app.use((err, req, res, next) => {
  if (err.statusCode === 500) {
    res.status(500).send({ message: `На сервере произошла ошибка ${err.name}: ${err.message}` });
    return;
  }
  res.status(err.statusCode || 500).send({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
