const mongoose = require('mongoose');
const { writeLog } = require('../files/logWriter');

const BAD_REQUEST = 400;
const INTERNAL_ERROR = 500;
const CONFLICT = 409;

// eslint-disable-next-line no-unused-vars,consistent-return
module.exports = (err, req, res, next) => {
  if (err.code === 11000) {
    res.status(CONFLICT).send({ message: 'Почта уже используется' });
    return;
  }
  if (!res.statusCode) {
    writeLog(err);
    res.status(INTERNAL_ERROR).send({ message: 'Произошла ошибка сервера.' });
  }
  if (err instanceof mongoose.Error.CastError) {
    res.status(BAD_REQUEST).send({ message: 'Некорректный запрос.' });
    return;
  }
  if (err instanceof mongoose.Error.ValidationError) {
    res.status(BAD_REQUEST).send({ message: 'Ошибка валидации' });
    return;
  }
  res.status(err.statusCode).send({ message: err.message });
};
