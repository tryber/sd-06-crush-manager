const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const SUCCESS = 200;

const lerArquivo = async (arquivo) => {
  const conteudoArquivo = await fs.readFile(path.resolve(path.join(__dirname, arquivo)), 'utf-8');
  return conteudoArquivo;
};

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', async (__request, response) => {
  const data = await lerArquivo('/crush.json');
  response.status(SUCCESS).send(JSON.parse(data));
});

app.get('/crush/:id', async (request, response) => {
  const { id } = request.params;
  const data = await lerArquivo('/crush.json');
  const newData = JSON.parse(data);
  const actor = newData.find((element) => element.id === Number(id));
  response.status(SUCCESS).json(actor);
});

app.listen(3000, () => console.log('ouvindo na porta 3000'));
