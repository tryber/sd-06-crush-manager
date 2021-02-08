const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const SUCCESS = 200;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use(bodyParser.json());

const getCrushes = async () => {
  const arrayCrushes = await fs.readFileSync('./crush.json', 'utf-8');
  return JSON.parse(arrayCrushes);
};

app.get('/crush', async (req, res) => {
  const crushData = await getCrushes();
  res.status(200).send(crushData);
});

app.get('/crush/:id', async (req, res) => {
  const reqId = parseInt(req.params.id, 10);
  const arrayCrushes = await getCrushes();

  const foundCrush = arrayCrushes.find((crush) => crush.id === reqId);

  if (!foundCrush) res.status(404).json({ message: 'Crush não encontrado' });

  res.status(200).json(foundCrush);
});

app.listen(3000);
