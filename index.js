const express = require('express');
const bodyParser = require('body-parser');
const { getCrushes, getCrush, getToken, addCrush, updateCrush, deleteCrush } = require('./middlewares');

const app = express();
const port = 3000;
const SUCCESS = 200;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', getCrushes);
app.post('/crush', addCrush);
app.get('/crush/:id', getCrush);
app.put('/crush/:id', updateCrush);
app.delete('/crush/:id', deleteCrush);
app.post('/login', getToken);

app.listen(port);
