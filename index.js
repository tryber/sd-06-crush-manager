const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const SUCCESS = 200;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

// _______________________________________________________

// Requisito 1
const { readFile } = require('./src/utils/getData');

app.get('/crush', async (_req, res) => {
  const crushes = await readFile('crush');
  res.status(200).json(JSON.parse(crushes));
});

app.listen(3000, () => console.log('running'));
