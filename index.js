const express = require('express');
const bodyParser = require('body-parser');
const { standardResponse, getCrushes, getCrush, getToken, addCrush } = require('./middlewares');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', standardResponse);

app.get('/crush', getCrushes);
app.get('/crush/:id', getCrush);
app.post('/login', getToken);
app.post('/crush', addCrush);

app.listen(port);
