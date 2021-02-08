const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const SUCCESS = 200;

const fs = require('fs').promises;

const arquive = './crush.json';

const getData = async () => {
  const newData = await fs.readFile(arquive, 'utf8', (err, data) => {
    if (err) {
      console.error(`Não foi possível ler o arquivo ${arquive}\n Erro: ${err}`);
      process.exit(1);
    }
    return data;
  });
  return newData;
};

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use(bodyParser.json());

app.get('/crush', async (req, res) => {
  const response = await getData();
  res.send(response);
});

app.listen('3000');
