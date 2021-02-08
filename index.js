const express = require('express');
const crushes = require('./crush.json');

const app = express();
const SUCCESS = 200;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', (req, res) => {
  res.status(SUCCESS).json(crushes);
});

app.listen(3000);
