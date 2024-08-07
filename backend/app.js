const express = require('express');
const mongoose = require('mongoose');
const { errors: celebrateErrors } = require('celebrate');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const router = require('./routers');
const errors = require('./middlewars/errors');
const NotFoundError = require('./middlewars/NotFoundError');
const cors = require('./middlewars/cors');
const { requestLogger, errorLogger } = require('./middlewars/logger');

const app = express();
const { PORT, MONGO_DB } = process.env;
mongoose
  .connect(MONGO_DB, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  });
app.use(requestLogger);
app.use(cors);
app.use(express.json());
app.use(cookieParser());
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use(router);
app.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});
app.use(errorLogger);
app.use(celebrateErrors());
app.use(errors);

app.listen(PORT, () => {
});
