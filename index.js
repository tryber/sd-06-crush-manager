const express = require('express');
const bodyParser = require('body-parser');
const { readFile } = require('./utils/manageFiles');

const app = express();
const SUCCESS = 200;

app.use(bodyParser.json());

app.get('/crush', async (req, res) => {
  const crushFile = await readFile();
  res.status(200).send(crushFile);
});

app.get('/crush/:id', async (req, res) => {
  const crushFile = await readFile();
  const { id } = req.params;
  const selected = crushFile.find((elem) => elem.id === parseInt(id, 10));
  if (!selected) res.status(404).send({ message: 'Crush não encontrado' });
  res.status(200).send(selected);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.listen(3000, () => console.log('Ouvindo na porta: ', 3000));
