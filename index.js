const express = require('express');

const app = express();
const SUCCESS = 200;
const fs = require('fs');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
const fileName = 'crush.json';

app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

// desafio 1
app.get('/crush', (req, res) => {
  const file = fs.readFileSync(fileName);
  if (!file) {
    return res.status(200).send([]);
  }
  return res.status(200).send(JSON.parse(file));
});

// desafio 2
app.get('/crush/:id', (req, res) => {
  const id = Number(req.params.id);
  const file = fs.readFileSync(fileName);
  const crushes = JSON.parse(file);
  let crush = null;

  if (id > 0) {
    crush = crushes.find((item) => id === item.id);
  }

  if (!crush) {
    return res.status(404).send({ message: 'Crush não encontrado' });
  }
  return res.status(200).send(crush);
});

app.listen(3000, () => console.log('listening port 3000'));
