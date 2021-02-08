const express = require('express');
const bodyParser = require('body-parser');
const data = require('./crush.json');

const port = 3000;

const app = express();
const SUCCESS = 200;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', (_req, res, _next) => {
  if (data.length) return res.status(SUCCESS).send(data);
  return res.status(SUCCESS).send([]);
});

app.get('/crush/:id', (req, res, _next) => {
  const { id } = req.params;
  if (!data[id]) return res.json({ message: 'Crush não encontrado' });
  return res.status(SUCCESS).json(data[id]);
});

app.listen(port);
