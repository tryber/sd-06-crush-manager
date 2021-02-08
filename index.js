const express = require('express');
const crushRegistered = require('./data');

const app = express();
const SUCCESS = 200;

app.listen(3000, () => console.log('Executando'));

app.get('/crush', (_req, res) => {
  res.send(crushRegistered);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});
