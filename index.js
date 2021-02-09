const express = require('express');

const data = require('./crush.json');

const app = express();

const SUCCESS = 200;
const port = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

// Requisito 1
app.get('/crush', (_req, res) => {
  if (data.length === 0) {
    res.status(SUCCESS).send([]);
  } else {
    res.status(SUCCESS).send(data);
  }
});

app.listen(port, () => console.log('working...'));
