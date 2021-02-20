const express = require('express');

const app = express();
const SUCCESS = 200;
const port = 3000;
const fs = require('fs');
const path = require('path');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

// Requisito 1

const readFile = (file) => new Promise((resolve, reject) => {
  fs.readFile(file, 'utf-8', (err, content) => {
    if (err) return reject(err);
    resolve(JSON.parse(content));
  });
});

app.get('/crush', async (req, res) => {
  const file = await readFile(path.join(__dirname, '.', 'crush.json'));
  console.log(file);
  // if (file.length === 0) res.status(200).send([]);
  res.status(200).json(file);
});

// Requisito 2

app.get('/crush/:id', async (req, res) => {
  const file = await readFile(path.join(__dirname, '.', 'crush.json'));
  const { id } = req.params;
  const result = file.filter((el) => el.id === +id)[0];
  if (!result) res.status(404).json({ message: 'Crush não encontrado' });
  res.status(200).send(result);
});

app.listen(port);
