const express = require('express');
const bodyParser = require('body-parser');
const { getData, getDataById, validateCrush, validateCrushId, validateUser,
  validateToken, deleteCrush, searchCrush } = require('./service');

const app = express();
const SUCCESS = 200;
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', getData);
app.get('/crush/search', validateToken, searchCrush);
app.get('/crush/:id', getDataById);
app.post('/login', validateUser);
app.post('/crush', validateToken, validateCrush);
app.put('/crush/:id', validateToken, validateCrushId);
app.delete('/crush/:id', validateToken, deleteCrush);

app.listen(3000);
