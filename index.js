const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const crushJson = fs.readFileSync('./crush.json');

const crush = JSON.parse(crushJson);

const app = express();

app.use(bodyParser.json());

const SUCCESS = 200;

app.get('/crush/:id', (req, res) => {
  const { id } = req.params;
  const result = (id && id >= 0) && crush.find((person) => person.id === Number(id));

  if (result) return res.status(SUCCESS).send(result);

  res.status(404).send({ message: 'Crush não encontrado' });
});

app.get('/crush', (req, res) => {
  if (crush) return res.status(200).send([]);

  res.status(SUCCESS).send(crush);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.listen(3000);
