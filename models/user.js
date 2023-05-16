const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const NotFoundError = require('../errors/not-found-err');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minLength: 2,
    maxLength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    validate: {
      validator(v) {
        const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
        const regex = new RegExp(expression);
        return regex.test(v);
      },
      message: (props) => `${props.value} некорректный URL!`,
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    minLength: 8,
    required: true,
    select: false,
  },

});

userSchema.static('findUserByCredentials', function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((match) => {
          if (!match) {
            throw new NotFoundError('Неправильные почта или пароль');
          }
          return user;
        });
    });
});

module.exports = mongoose.model('user', userSchema);
