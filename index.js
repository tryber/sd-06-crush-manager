const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const util = require('util');

const app = express();
const SUCCESS = 200;
const file = './crush.json';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use(bodyParser.json());

const readFile = util.promisify(fs.readFile);

function fileContent(filePath) {
  return readFile(filePath, 'utf8');
}

app.get('/crush', async (request, response) => {
  const data = await fileContent(file);
  response.status(200).send(JSON.parse(data));
});

app.get('/crush/:id', async (request, response) => {
  const id = parseInt(request.params.id, 10);
  const data = await fileContent(file);
  const crush = await JSON.parse(data).find((crushs) => crushs.id === id) || false;
  if (!crush) {
    return response.status(404).send({ message: 'Crush não encontrado' });
  }
  response.status(200).send(crush);
});

app.listen(3000, () => console.log('Rodando na porta 3000'));
