const { celebrate, Joi } = require('celebrate');
const { linkExp } = require('../consts/regex');

const cardModelValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().pattern(linkExp).required(),
  }).unknown(true),
});

module.exports = { cardModelValidator };
