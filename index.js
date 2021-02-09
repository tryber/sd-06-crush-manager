const express = require('express');
const fs = require('fs').promises;

const fileName = 'crush.json';

const app = express();

const SUCCESS = 200;
const FAILURE = 404;

app.listen(3000, () => {
  console.log('Ouvindo a porta 3000');
});

app.use((req, _res, next) => {
  console.log({
    Date: new Date(),
    Method: req.method,
    URL: req.originalUrl,
  });

  next();
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_req, res) => {
  res.status(SUCCESS).send();
});

app.get('/crush', async (_req, res) => {
  const file = await fs.readFile(fileName, 'utf-8');
  return res.status(SUCCESS).send(JSON.parse(file));
});

app.get('/crush/:id', async (req, res) => {
  const file = await fs.readFile(fileName, 'utf-8');
  const parsedJson = JSON.parse(file);
  const { id } = req.params;
  const filteredCrush = parsedJson.find((crush) => crush.id === +id);

  if (!filteredCrush) {
    return res.status(FAILURE).send({ message: 'Crush não encontrado' });
  }
  return res.status(SUCCESS).send(filteredCrush);
});
