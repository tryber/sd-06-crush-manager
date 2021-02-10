const express = require('express');
const bodyParser = require('body-parser');

const { getData, getDataById, validateCrush, validateCrushId, validateInfo,
  validateToken, deleteCrush, searchCrush } = require('./services');

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const port = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', getData);
app.get('/crush/search', validateToken, searchCrush);
app.get('/crush/:id', getDataById);
app.post('/login', validateInfo);
app.post('/crush', validateToken, validateCrush);
app.put('/crush/:id', validateToken, validateCrushId);
app.delete('/crush/:id', validateToken, deleteCrush);

app.listen(port, () => console.log(`Aplicação executando na porta: ${port}!`));
