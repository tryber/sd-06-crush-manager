const express = require('express');
const bodyParse = require('body-parser');
const findAll = require('./findAll');
const findById = require('./findById');
const login = require('./login');

const app = express();
const SUCCESS = 200;

app.use(bodyParse.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', findAll);
app.get('/crush/:id', findById);
app.post('/login', login);

app.listen(3000, () => console.log('ta workando'));
