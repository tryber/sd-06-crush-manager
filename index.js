const express = require('express');
const data = require('./crush.json');

const app = express();
const SUCCESS = 200;
const port = 3000;

app.use((express.json()));

const getData = (_request, response) => {
  if (data.length) return response.status(SUCCESS).send(data);
  return response.status(SUCCESS).send([]);
};

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', getData);

app.listen(port, () => console.log(`Aplicação executando na porta: ${port}!`));
