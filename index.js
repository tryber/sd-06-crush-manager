const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const SUCCESS = 200;

app.use(express.json());

app.use(bodyParser.json());
const crushes = require('./crush');

app.get('/crush', (req, res, _next) => {
  if (!crushes) return res.status(200).json([]);
  res.status(200).json(crushes);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.listen(3000, () => console.log('Em execução'));
