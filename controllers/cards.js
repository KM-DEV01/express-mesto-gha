const Card = require('../models/card');
const {
  handleErrorOnCreate, handleErrorOnUpdate, handleDefaultError,
} = require('../utils/errorHandler');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => handleDefaultError(err, res));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId, { new: true })
    .orFail()
    .then(() => res.send({ message: 'Карточка удалена' }))
    .catch((err) => handleErrorOnUpdate(err, res));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => handleErrorOnCreate(err, res));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch((err) => handleErrorOnUpdate(err, res));
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch((err) => handleErrorOnUpdate(err, res));
};
