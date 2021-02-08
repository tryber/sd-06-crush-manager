const express = require('express');
const fs = require('fs');
const { request } = require('http');

const app = express();
const SUCCESS = 200;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', (_request, response) => {
  const readData = fs.readFileSync('crush.json');
  if (readData) {
    const dataJson = JSON.parse(readData);
    response.status(200).send(dataJson);
  } else {
    response.status(200).send(JSON.parse([]));
  }
});

app.get('/crush/:id', (request, response) => {
  const { id } = request.params;
  const readData = fs.readFileSync('crush.json');
  const dataJson = JSON.parse(readData);
  const dataFiltered = dataJson.filter(item => item.id === +id);
  if (dataFiltered.length !== 0) {
    response.status(200).send(dataFiltered);
  } else {
    response.status(404).send(JSON.parse('{"message": "Crush não encontrado"}'));
  }
});

app.listen(3000);
