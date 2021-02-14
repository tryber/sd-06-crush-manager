const express = require('express');

const bodyParser = require('body-parser');

const app = express();
const SUCCESS = 200;

// app.use(); garante que todas as requisições passarão por ele
// body-parser para leituras de arquivos json (vindos, por exemplo, do body)
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});
