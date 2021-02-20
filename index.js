const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const SUCCESS = 200;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

// Requisito 1

const readFile = (file) => new Promise((resolve, reject) => {
  fs.readFile(file, 'utf-8', (err, content) => {
    if (err) return reject(err);
    resolve(content);
  });
});

app.get('/crush', async (req, res) => {
  const file = await readFile(path.join(__dirname, '.', 'crush.json'));
  // console.log(file);
  res.status(200).json(JSON.parse(file));
});

// Requisito 2

// app.get()

app.listen(3000, () => console.log('aqui'));
