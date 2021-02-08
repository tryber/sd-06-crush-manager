const express = require('express');
const bodyParser = require('body-parser');
const getAllCrushs = require('./getAllCrushs');
const findOneCrushById = require('./findOneCrushById');
const login = require('./login');

const app = express();
const SUCCESS = 200;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use(bodyParser.json());

app.get('/crush', getAllCrushs);

app.get('/crush/:id', findOneCrushById);

app.post('/login', login);

app.listen(3000, () => console.log('Rodando na porta 3000'));
