const express = require('express');
const readFile = require('./util/readFile');

const app = express();
const SUCCESS = 200;
const port = 3000;

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

// challenge 1
app.get('/crush', (_request, response) => {
  const fileData = readFile('crush.json');

  if (!fileData) {
    return response.status(200).send(fileData);
  }

  response.status(200).send(fileData);
});

// challenge 2
app.get('/crush/:id', (request, response) => {
  const { id } = request.params;
  const fileData = readFile('crush.json');
  const chosenCrush = fileData.find((crush) => crush.id === parseInt(id, 10));

  if (!chosenCrush) {
    return response.status(404).send({ message: 'Crush não encontrado' });
  }

  response.status(200).send(chosenCrush);
});

app.listen(port, () => console.log('Example app listening on port 3000!'));
