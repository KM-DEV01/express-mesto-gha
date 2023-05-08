const express = require('express');
const router = require('express').Router();

router.use(express.json());

router.use('/users', require('./users'));
router.use('/cards', require('./cards'));

router.use('*', (req, res) => res.status(404).send({ message: '404' }));

module.exports = router;
