const express = require('express');
const bodyParser = require('body-parser');
const { getAllCrushs, getCrushById } = require('./getCrushs');
const { getToken } = require('./login');
const { newCrush } = require('./postCrush');
const { validateToken } = require('./validateToken');
const { changeCrush } = require('./putCrush');
const { deleteCrushId } = require('./deleteCrush');
const { searchCrushs } = require('./searchCrush');

const app = express();
const SUCCESS = 200;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_req, res) => {
  res.status(SUCCESS).send();
});

app.get('/crush', getAllCrushs);
app.get('/crush/search', validateToken, searchCrushs);
app.get('/crush/:id', getCrushById);
app.post('/login', getToken);
app.post('/crush', validateToken, newCrush);
app.put('/crush/:id', validateToken, changeCrush);
app.delete('/crush/:id', validateToken, deleteCrushId);

app.listen(3000);
