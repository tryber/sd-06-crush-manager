const express = require('express');
const bodyParser = require('body-parser');

const { getData, getDataById } = require('./services/getCrush');
const validateInfo = require('./services/validate');

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const port = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', getData);
app.get('/crush/:id', getDataById);
app.post('/login', validateInfo);

app.listen(port, () => console.log(`Aplicação executando na porta: ${port}!`));
