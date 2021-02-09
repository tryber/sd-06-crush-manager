const express = require('express');

const getData = require('./services/getData');

const app = express();
const SUCCESS = 200;
const port = 3000;

app.use((express.json()));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', getData);

app.listen(port, () => console.log(`Aplicação executando na porta: ${port}!`));
