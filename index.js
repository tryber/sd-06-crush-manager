const express = require('express');
const bodyParser = require('body-parser');
const {
  getCrushes,
  getCrush,
  getToken,
  addCrush,
  updateCrush,
  deleteCrush,
  searchCrush,
  verifyToken,
  verifyCrushPackage,
} = require('./middlewares');

const app = express();
const port = 3000;
const SUCCESS = 200;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', getCrushes);
app.post('/crush', verifyToken, verifyCrushPackage, addCrush);
app.get('/crush/search', verifyToken, searchCrush);
app.get('/crush/:id', getCrush);
app.put('/crush/:id', verifyToken, verifyCrushPackage, updateCrush);
app.delete('/crush/:id', verifyToken, deleteCrush);
app.post('/login', getToken);

app.listen(port);
