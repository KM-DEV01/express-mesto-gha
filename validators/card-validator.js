const { celebrate, Joi } = require('celebrate');

const cardModelValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(),
  }).unknown(true),
});

module.exports = { cardModelValidator };
