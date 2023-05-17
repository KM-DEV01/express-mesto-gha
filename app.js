const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(express.json());
app.use('/', require('./routes/index'));

app.use(errors());
app.use(require('./midlewares/errorHandler'));

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
