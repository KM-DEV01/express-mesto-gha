const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '64578ea6165102c531203da6', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };
  next();
});

app.use('/', require('./routes/index'));

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
