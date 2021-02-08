const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const util = require('util');

const app = express();
const SUCCESS = 200;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use(bodyParser.json());

const readFile = util.promisify(fs.readFile);

function getCrush() {
  return readFile('./crush.json', 'utf-8');
}

app.get('/crush', async (_req, res) => {
  const data = await getCrush();
  const treatedData = JSON.parse(data);
  res.status(200).send(treatedData);
});

app.get('/crush/:id',async (req, res) => {
  const id = Number(req.params.id);
  const data = await getCrush();
  const treatedData = JSON.parse(data);
  const user = treatedData.filter((crush) => crush.id === id);
  if (!user) return res.status(404).send({ message: 'Crush não encontrado' })
  res.status(200).send(user);
});

app.listen(3000, () => console.log('servidor online porta 3000'));
