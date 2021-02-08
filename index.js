const express = require('express');

const app = express();
const SUCCESS = 200;
const port = 5000;
const { getCrush, getCrushId } = require('./getRequest');
const { handleLogin } = require('./postRequest');

app.use(express.json());

app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});
app.get('/crush', getCrush);
app.get('/crush/:id', getCrushId);

app.post('/login', handleLogin);

app.listen(port, () => console.log(`Executando na porta ${port}`));
