const express = require('express');
const bodyParser = require('body-parser');
const { getAllCrushes } = require('./controller/getAllCrushes');
const { getCrushById } = require('./controller/getCrushById');
const { login } = require('./controller/login');
const { validateCrush } = require('./controller/validateCrush');
const { createCrush } = require('./controller/newCrush');
const { checkToken } = require('./services');

const app = express();
const SUCCESS = 200;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use(bodyParser.json());

app.post('/login', login);
app.get('/crush', getAllCrushes);
app.get('/crush/:id', getCrushById);

app.use(checkToken);

app.post('/crush', validateCrush, createCrush);

app.listen(3000, () => {
  console.log('Working 3000');
});
