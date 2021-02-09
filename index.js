const express = require('express');
const bodyParser = require('body-parser');
const { getAllCrushes } = require('./middlewares/getAllCrushes');
const { getCrushById } = require('./middlewares/getCrushById');
const { login } = require('./middlewares/login');
const { checkToken } = require('./middlewares/checkToken');
const { validateCrush } = require('./middlewares/validateCrush');
const { addNewCrush } = require('./middlewares/addNewCrush');

const app = express();
const SUCCESS = 200;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});
// teste
app.use(bodyParser.json());

app.post('/login', login);
app.get('/crush', getAllCrushes);
app.get('/crush/:id', getCrushById);

app.use(checkToken);

app.post('/crush', validateCrush);

app.listen(3000);
