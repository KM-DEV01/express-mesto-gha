function handleErrorOnSearch(err, res) {
  if (err.name === 'CastError') {
    return res.status(400).send({ message: 'Некорректный запрос.' });
  }
  if (err.name === 'DocumentNotFoundError') {
    return res.status(404).send({ message: 'Запись по указанному _id не найдена.' });
  }
  return res.status(500).send({ message: `Произошла ошибка: ${err.message}.` });
}

function handleErrorOnCreate(err, res) {
  if (err.name === 'ValidationError') {
    return res.status(400).send({ message: 'Ошибка валидации. Поля заполнены некорректно или не заполнены.' });
  }
  return res.status(500).send({ message: `Произошла ошибка: ${err.message}.` });
}

function handleErrorOnUpdate(err, res) {
  if (err.name === 'ValidationError') {
    return res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
  }
  if (err.name === 'CastError') {
    return res.status(400).send({ message: 'Некорректный запрос.' });
  }
  if (err.name === 'DocumentNotFoundError') {
    return res.status(404).send({ message: 'Запись по указанному _id не найдена.' });
  }
  return res.status(500).send({ message: `Произошла ошибка: ${err.message}.` });
}

module.exports = { handleErrorOnSearch, handleErrorOnCreate, handleErrorOnUpdate };
