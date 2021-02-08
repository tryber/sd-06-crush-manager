const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const SUCCESS = 200;

app.use(bodyParser.json());

const CrashAll = require('./src/controllers/CrashAll');
const CrashById = require('./src/controllers/CrashById');
const CrashToken = require('./src/controllers/CrashToken');

app.use('/', CrashAll, CrashById, CrashToken);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.listen(3000, () => {
  console.log('API ONLINE... Port 3000');
});
