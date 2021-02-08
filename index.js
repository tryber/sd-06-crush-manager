const express = require('express');
const fs = require('fs');
const util = require('util');
const path = require('path');

const app = express();
const SUCCESS = 200;

const readFile = util.promisify(fs.readFile);

const getData = async () => {
  const fileName = path.join(__dirname, 'crush.json');
  const data = await readFile(fileName);
  return JSON.parse(data);
};

// Desafio 01 - endpoint GET /crush
app.get('/crush', async (req, res) => {
  const crushes = await getData();
  res.status(200).send(crushes);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.listen(3000);
