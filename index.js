const express = require('express');
// const path = require('path');
const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

const app = express();
const SUCCESS = 200;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_req, res) => {
  res.status(SUCCESS).send();
});

app.get('/crush', async (_req, res) => {
  const data = await readFile('./crush.json', 'utf8');
  res.status(SUCCESS).send(JSON.parse(data));
});

app.get('/crush/:id', async (req, res) => {
  const data = await readFile('./crush.json', 'utf8');
  const dataId = req.params.id;
  console.log(typeof +dataId);
  if (!JSON.parse(data)[+dataId] || +dataId === 0) {
    res.status(404).send({ message: 'Crush não encontrado' });
  }
  res.status(SUCCESS).send(JSON.parse(data)[+dataId - 1]);
});

app.listen(3000);
