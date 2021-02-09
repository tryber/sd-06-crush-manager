const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const SUCCESS = 200;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use(bodyParser.json());

const getAllCrush = require('./getAllCrushes');
const getCrushById = require('./getCrushById');
const { login } = require('./getToken');

app.get('/crush', getAllCrush);

app.get('/crush/:id', getCrushById);

app.post('/login', login);

app.listen(3000);
