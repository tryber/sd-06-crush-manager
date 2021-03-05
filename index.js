const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
const SUCCESS = 200;
const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use(bodyParser.json());

app.use(routes);

app.listen(PORT, () => console.log('Rodando Liso!'));

app.use((error, _request, response, _next) => response.status(error.status || 500).send(`Error, error message: ${error.message}`));
