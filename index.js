const express = require('express');
const fs = require('fs').promises;

const crushData = 'crush.json';
const crushResgistered = require('./crush.json');

const app = express();
const SUCCESS = 200;
const NOTFOUND = 404;

app.use(express.json());
app.listen(3000, () => console.log('Executando'));

app.get('/crush', async (_req, res) => {
  const readCrush = await fs.readFile(crushData);
  if (readCrush < 1) {
    return res.status(SUCCESS).json(crushResgistered);
  }
  return res.status(SUCCESS).json(JSON.parse(readCrush));
});

app.get('/crush/:id', async (req, res) => {
  const readCrush = await fs.readFile(crushData, 'utf-8');
  const crushDataJson = JSON.parse(readCrush);
  const { id } = req.params;
  const verifyCrushId = crushDataJson.find((crush) => crush.id === parseInt(id, 10));
  console.log(verifyCrushId);
  if (!verifyCrushId) {
    return res.status(NOTFOUND).send({ message: 'Crush não encontrado' });
  }
  return res.status(SUCCESS).send(verifyCrushId);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});
