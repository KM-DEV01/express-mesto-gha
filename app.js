const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.use('/', require('./routes/index'));

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
