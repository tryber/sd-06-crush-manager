const express = require('express');
const bodyParser = require('body-parser');
const { getAllCrushes, getCrush, getToken } = require('./controllers');

const app = express();
const SUCCESS = 200;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', getAllCrushes);
app.get('/crush/:id', getCrush);
app.post('/login', getToken);

app.listen(3000);
