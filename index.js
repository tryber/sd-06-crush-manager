const express = require('express');

const app = express();
const SUCCESS = 200;
const port = 5000;

const { getCrush, getCrushId } = require('./getRequest');
const { handleLogin, addCrush } = require('./postRequest');
const { handleError } = require('./utils/middlewareError');

app.use(express.json());

app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});
app.get('/crush', getCrush);
app.get('/crush/:id', getCrushId);

app.post('/login', handleLogin);
app.post('/crush', addCrush);

app.use(handleError);

app.listen(port, () => console.log(`Executando na porta ${port}`));
