const express = require('express');
const bodyParser = require('body-parser');

const { pegandoTodosOsCrushs } = require('./servicos');
const { pegandoCrushId } = require('./controle/pegandoPorId');

const app = express();
const SUCCESS = 200;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use(bodyParser.json());

app.get('/crush', async (req, res) => {
  const response = await pegandoTodosOsCrushs();
  res.status(200).send(response);
});

app.get('/crush/:id', pegandoCrushId);

app.listen(3000, () => {
  console.log('trabalhando');
});
