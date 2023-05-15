const express = require('express');
const router = require('express').Router();
const { errors } = require('celebrate');
const { auth } = require('../controllers/users');
const { createUser } = require('../controllers/users');
const { userModelValidator, signInValidator } = require('../validators/user-validator');

const NOT_FOUND = 404;

router.use(express.json());

router.use('/signin', signInValidator, auth);
router.use('/signup', userModelValidator, createUser);

router.use(require('../midlewares/auth'));

router.use('/users', require('./users'));
router.use('/cards', require('./cards'));

router.use(errors());
router.use(require('../midlewares/errorHandler'));

router.use('*', (req, res) => res.status(NOT_FOUND).send({ message: '404' }));

module.exports = router;
