const express = require('express');
const router = require('express').Router();

router.use(express.json());

router.use((req, res, next) => {
  req.user = {
    _id: '64578ea6165102c531203da6', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };
  next();
});

router.use('/users', require('./users'));
router.use('/cards', require('./cards'));

router.use('*', (req, res) => res.status(404).send({ message: '404' }));

module.exports = router;
