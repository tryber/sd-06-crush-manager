const express = require('express');
const bodyParser = require('body-parser');
const getAllCrushes = require('./services/getAllCrushes');
const getCrushById = require('./services/getCrushById');
const login = require('./services/login');
const createCrush = require('./services/createCrush');
const editCrush = require('./services/editCrush');
const {
  validateToken,
  validateName,
  validateAge,
  valiDate,
  validateRate,
} = require('./utils/validations');

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

app.post('/crush', validateToken, validateName, validateAge, valiDate, validateRate, createCrush);

app.put('/crush/:id', validateToken, validateName, validateAge, valiDate, validateRate, editCrush);

app.listen(PORT, () => console.log('Server rolando na porta %s', PORT));
