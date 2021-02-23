const express = require('express');
const bodyParser = require('body-parser');

const { pegandoCrushs } = require('./servicos');
const { pegandoCrushId } = require('./controle/pegandoPorId');
const { login } = require('./controle/login');

const app = express();
const SUCCESS = 200;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use(bodyParser.json());

app.post('/login', login);

app.get('/crush', async (req, res) => {
  const response = await pegandoCrushs();
  res.status(200).send(response);
});

app.get('/crush/:id', pegandoCrushId);

app.listen(3000, () => {
  console.log('trabalhando');
});
