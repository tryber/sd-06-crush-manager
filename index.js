const express = require('express');
const getCrushes = require('./routes/requisito1');
const crushById = require('./routes/requisito2');
const loginControl = require('./routes/requisito3.js');
const addCrush = require('./routes/requisito4');
const editCrush = require('./routes/requisito5');

const app = express();
const SUCCESS = 200;

app.use(express.json());

app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', getCrushes);
app.post('/crush', addCrush);
app.get('/crush/:id', crushById);
app.put('/crush/:id', editCrush);
app.post('/login', loginControl);

app.listen(3000);
