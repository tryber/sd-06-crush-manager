const express = require('express');
const bodyParser = require('body-parser');
const getAllCrushs = require('./getAllCrushs');
const findOneCrushById = require('./findOneCrushById');
const login = require('./login');
const verifyToken = require('./verifyToken');
const addCrush = require('./addCrush');
const editCrush = require('./editCrush');
const deleteCrush = require('./deleteCrush');
const searchCrush = require('./searchCrush');

const app = express();
const SUCCESS = 200;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use(bodyParser.json());

app.get('/crush', getAllCrushs);

app.get('/crush/search', verifyToken, searchCrush);

app.get('/crush/:id', findOneCrushById);

app.post('/login', login);

app.post('/crush', verifyToken, addCrush);

app.put('/crush/:id', verifyToken, editCrush);

app.delete('/crush/:id', verifyToken, deleteCrush);

app.listen(3000, () => console.log('Rodando na porta 3000'));
