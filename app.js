const express = require('express');
const helmet = require('helmet');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const errorsHandler = require('./middlewares/errors-handler');
const corsValidator = require('./middlewares/cors-validator');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/index');
const rateLimiter = require('./middlewares/rate-limiter');
const { DATABASE, PORT } = require('./utils/config');

const app = express();
app.use(helmet());
app.use(rateLimiter);
app.use(cookieParser());

// Парсер данных
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// подключение к серверу mongo
mongoose.connect(DATABASE, {
  useNewUrlParser: true,
});
// рутинг
app.use(router);

// логгер запросов
app.use(requestLogger);

// логгер ошибок
app.use(errorLogger);

app.use(corsValidator);

// обработка ошибок celebrate
app.use(errors());

// централизованный обработчик ошибок
app.use(errorsHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
