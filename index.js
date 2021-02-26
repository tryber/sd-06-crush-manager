const express = require('express');
const bodyParser = require('body-parser');
const getAllCrushes = require('./controllers/getAllCrushesController');
const getCrushById = require('./controllers/getCrushByIdController');
const login = require('./controllers/login');
const createCrush = require('./controllers/createCrushController');
const editCrush = require('./controllers/editCrushController');
const deleteCrush = require('./controllers/deleteCrushController');
const searchCrush = require('./controllers/searchCrushControler');
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

app.get('/crush/search', validateToken, searchCrush);

app.get('/crush', getAllCrushes);

app.get('/crush/:id', getCrushById);

app.post('/login', login);

app.post('/crush', validateToken, validateName, validateAge, valiDate, validateRate, createCrush);

app.put('/crush/:id', validateToken, validateName, validateAge, valiDate, validateRate, editCrush);

app.delete('/crush/:id', validateToken, deleteCrush);

app.listen(PORT, () => console.log('Server rolando na porta %s', PORT));
