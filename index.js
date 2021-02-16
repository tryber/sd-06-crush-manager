const express = require('express');
const fs = require('fs').promises;

const app = express();
const SUCCESS = 200;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

const readData = async () => {
  const file = await fs.readFile('crush.json', 'utf-8');
  return JSON.parse(file);
};

app.get('/crush', async (_req, res) => {
  const crushData = await readData();
  res
    .status(SUCCESS)
    .send(crushData);
});

app.listen(3000);
