const express = require('express');
const data = require('./crush.json');

const port = 3000;

const app = express();
const SUCCESS = 200;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', (_req, res, _next) => {
  res.status(SUCCESS).json(data);
});

app.get('/crush/:id', (req, res, _next) => {
  const { id } = req.params;
  if (!data[id]) return res.json({ message: 'Crush não encontrado' });
  return res.json(data[id]);
});

app.listen(port);
