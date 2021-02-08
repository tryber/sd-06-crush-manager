const express = require('express');
const fs = require('fs');

const app = express();
const SUCCESS = 200;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', (_request, response) => {
  const readData = fs.readFileSync('crush.json');
  const dataJson = JSON.parse(readData)
  response.status(200).send(dataJson);
});

app.listen(3000);