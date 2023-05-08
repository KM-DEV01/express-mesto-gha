const mongoose = require('mongoose');
const { writeLog } = require('../files/logWriter');

const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INTERNAL_ERROR = 500;

function handleDefaultError(err, res) {
  writeLog(err);
  return res.status(INTERNAL_ERROR).send({ message: 'Произошла ошибка.' });
}
function handleErrorOnSearch(err, res) {
  if (err instanceof mongoose.Error.CastError) {
    return res.status(BAD_REQUEST).send({ message: 'Некорректный запрос.' });
  }
  if (err instanceof mongoose.Error.DocumentNotFoundError) {
    return res.status(NOT_FOUND).send({ message: 'Запись по указанному _id не найдена.' });
  }
  return handleDefaultError(err, res);
}

function handleErrorOnCreate(err, res) {
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(BAD_REQUEST).send({ message: 'Ошибка валидации. Поля заполнены некорректно или не заполнены.' });
  }
  return handleDefaultError(err, res);
}

function handleErrorOnUpdate(err, res) {
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные при обновлении записи.' });
  }
  if (err instanceof mongoose.Error.CastError) {
    return res.status(BAD_REQUEST).send({ message: 'Некорректный запрос.' });
  }
  if (err instanceof mongoose.Error.DocumentNotFoundError) {
    return res.status(NOT_FOUND).send({ message: 'Запись по указанному _id не найдена.' });
  }
  return handleDefaultError(err, res);
}

module.exports = {
  handleErrorOnSearch, handleErrorOnCreate, handleErrorOnUpdate, handleDefaultError,
};
