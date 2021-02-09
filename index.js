const express = require('express');
const fs = require('fs').promises;

const crushes = 'crush.json';
const crushResgistered = require('./crush.json');

const app = express();
const SUCCESS = 200;

app.use(express.json());
app.listen(3000, () => console.log('Executando'));

app.get('/crush', async (_req, res) => {
  const read = await fs.readFile(crushes);
  if (read < 1) {
    return res.status(SUCCESS).json(crushResgistered);
  }
  return res.status(SUCCESS).json(JSON.parse(read));
});

app.get('/crush/:id', async (req, res) => {
  const read = await fs.readFile(crushes, 'utf-8');
  const crushesJson = JSON.parse(read);
  const { id } = req.params;
  const verifyCrushId = crushesJson.find((crush) => crush.id === parseInt(id, 10));
  console.log(verifyCrushId);
  if (verifyCrushId < 1) {
    return res.status(404).json({ message: 'Crush não encontrado' });
  }
  return res.status(404).send(verifyCrushId);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});
