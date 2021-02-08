const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
const SUCCESS = 200;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use(bodyParser.json());

app.use(routes);

app.listen(3000, () => console.log('Running'));

app.use((err, req, res, next) => res.status(err.status || 500).send(`Erro, mensagem erro: ${err.message}`));
