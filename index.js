const express = require('express');
const fs = require('fs').promises;

const app = express();
const SUCCESS = 200;
const NOT_FOUND = 404;

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

app.get('/crush/:id', async (req, res) => {
  const { id: stringId } = req.params;
  const id = parseInt(stringId, 10);

  const crushData = await readData();
  const crushFound = crushData.filter((crush) => crush.id === id)[0];

  if (crushFound) return res.status(SUCCESS).send(crushFound);

  res.status(NOT_FOUND).send({ message: 'Crush não encontrado' });
});

app.listen(3000);
