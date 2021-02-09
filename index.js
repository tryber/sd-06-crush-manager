const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const { promisify } = require('util');
const {
  validateEmail,
  validatePassword,
  checkRequestField,
  generateToken } = require('./utils');

const readCrushes = promisify(fs.readFile);

const app = express();
const SUCCESS = 200;
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

/* app.get('/crush', (request, response) => {
  const fileName = './crush.json';
  const data = fs.readFile(fileName, (err, rawData) => {
    if (err) {
      throw new Error(`Could not read file ${ fileName }\n Error: ${ err }`);
    }
    const data = JSON.parse(rawData);
    if (!data) response.status(200).send([]);
    response.status(SUCCESS).send(data);
  });
}); */

app.get('/crush', (request, response) => {
  const fileName = './crush.json';
  readCrushes(fileName)
    .then((rawData) => JSON.parse(rawData))
    .then((data) => response.status(SUCCESS).send(data))
    .catch((error) => console.log(`Could not read file ${fileName}\n Error: ${error}`));
});

app.get('/crush/:id', async (request, response) => {
  const id = parseInt(request.params.id, 10);
  const fileName = './crush.json';
  const crushes = await readCrushes(fileName)
    .then((rawData) => JSON.parse(rawData))
    .then((data) => data)
    .catch((error) => console.log(`Could not read file ${fileName}\n Error: ${error}`));
  const retrievedCrush = crushes.find((crush) => crush.id === id);
  if (!retrievedCrush) response.status(404).json({ message: 'Crush não encontrado' });
  response.status(SUCCESS).send(retrievedCrush);
});

app.post('/login', (request, response) => {
  const requestObject = request.body;

  if (!checkRequestField(requestObject, 'email')) {
    return response.status(400).send({
      message: 'O campo "email" é obrigatório',
    });
  }

  if (!checkRequestField(requestObject, 'password')) {
    return response.status(400).send({
      message: 'O campo "password" é obrigatório',
    });
  }

  if (!validateEmail(requestObject.email)) {
    return response.status(400).send({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }

  if (!validatePassword(requestObject.password)) {
    return response.status(400).send({
      message: 'A "senha" deve ter pelo menos 6 caracteres',
    });
  }

  response.status(SUCCESS).send(
    {
      token: `${generateToken(16)}`,
    },
  );
});

app.all('/crush', (request, response) => {
  const requestObject = request.body;

  response.status(SUCCESS).send(requestObject);
});

app.listen(3000, () => {
  console.log('Listening on port 3000!');
});
