const mongoose = require('mongoose');
const { writeLog } = require('../utils/logWriter');
const BadRequestError = require('../errors/bad-request-err');
const InternalError = require('../errors/internal_error');

// eslint-disable-next-line no-unused-vars,consistent-return
module.exports = (err, req, res, next) => {
  if (!res.statusCode) {
    writeLog(err);
    res.status(InternalError).send({ message: 'Произошла ошибка сервера.' });
  }
  if (err instanceof mongoose.Error.CastError) {
    res.status(BadRequestError).send({ message: 'Некорректный запрос.' });
    return;
  }
  if (err instanceof mongoose.Error.ValidationError) {
    res.status(BadRequestError).send({ message: 'Ошибка валидации' });
    return;
  }
  res.status(err.statusCode).send({ message: err.message });
};
