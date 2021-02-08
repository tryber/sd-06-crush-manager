const express = require('express');
const crush = require('./crush.json');

const app = express();
const SUCCESS = 200;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', (_request, response) => {
  response.status(SUCCESS).send(crush);
});

app.listen(3000);
