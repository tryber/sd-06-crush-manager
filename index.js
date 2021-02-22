const express = require('express');
const bodyParser = require('body-parser');
const getAllCrushes = require('./services/getAllCrushes');
const getCrushById = require('./services/getCrushById');
const login = require('./services/login');

const app = express();
const SUCCESS = 200;
const PORT = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', getAllCrushes);

app.get('/crush/:id', getCrushById);

app.post('/login', login);

app.listen(PORT, () => console.log('Server rolando na porta %s', PORT));
