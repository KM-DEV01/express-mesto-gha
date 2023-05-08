const express = require('express');
const router = require('express').Router();

const NOT_FOUND = 404;

router.use(express.json());

router.use('/users', require('./users'));
router.use('/cards', require('./cards'));

router.use('*', (req, res) => res.status(NOT_FOUND).send({ message: '404' }));

module.exports = router;
