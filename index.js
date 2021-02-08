const express = require('express');

const data = require('./crush.json');

const app = express();

const SUCCESS = 200;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

// Requisito 1
app.get('/crush', (_req, res) => {
  if (data < 1) return ([]);
  res.status(SUCCESS).send(data);
});

app.listen(3000, () => console.log('port working...'));
