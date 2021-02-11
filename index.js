const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const SUCCESS = 200;

const routes = require('./routes');

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.all(/\//, routes);

app.listen(3000, () => console.log('rodando na porta 3000'));
