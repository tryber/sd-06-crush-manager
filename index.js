const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(bodyParser.json());

const SUCCESS = 200;

const crushPath = path.join('.', '/', 'crush.json');

app.get('/crush/:id', (req, res) => {
  const crushJson = fs.readFileSync(crushPath);
  const crush = JSON.parse(crushJson);
  const { id } = req.params;
  const result = (id && id >= 0) && crush.find((person) => person.id === Number(id));

  if (result) return res.status(SUCCESS).send(result);

  res.status(404).send({ message: 'Crush não encontrado' });
});

app.get('/crush', (req, res) => {
  const crushJson = fs.readFileSync(crushPath);
  const crush = JSON.parse(crushJson);
  if (!crush || crush.length === 0) return res.status(200).send([]);

  if (crush && crush.length > 0) return res.status(SUCCESS).send(crush);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.listen(3000);
