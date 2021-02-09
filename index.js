const express = require('express');
const bodyParser = require('body-parser');
const { standardResponse, getCrushes, getCrush } = require('./middlewares');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', standardResponse);

app.get('/crush', getCrushes);
app.get('/crush/:id', getCrush);

app.listen(port);
