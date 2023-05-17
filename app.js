const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { writeLog } = require('./utils/logWriter');

const { PORT = 3000 } = process.env;
const app = express();

const errObj = {
  name: 'test1',
  message: 'test1',
  code: 'test1',
};
writeLog(errObj);

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
