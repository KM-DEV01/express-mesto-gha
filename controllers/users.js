const User = require('../models/user');
const { handleErrorOnSearch, handleErrorOnCreate, handleErrorOnUpdate } = require('../utils/errorHandler');

module.exports.getUsers = (req, res) => {
  User.find({})
    .orFail()
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err.message}` }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .orFail()
    .then((users) => res.send({ data: users }))
    .catch((err) => handleErrorOnSearch(err, res));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => handleErrorOnCreate(err, res));
};

module.exports.updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about })
    .orFail()
    .then((users) => res.send({ data: users }))
    .catch((err) => handleErrorOnUpdate(err, res));
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar })
    .orFail()
    .then((users) => res.send({ data: users }))
    .catch((err) => handleErrorOnUpdate(err, res));
};
