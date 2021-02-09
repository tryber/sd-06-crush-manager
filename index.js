const express = require('express');
const { readerFile } = require('./utils/managerFiles');

const app = express();
const SUCCESS = 200;
const NOTFOUND = 400;
const PORT = 3037;
const notFoundCrush = { message: 'Crush não encontrado' };

// quero que todas as requisições devolvam um json
app.use(express.json()); // aqui já incorporou as funções do body-parse

// Requisito 1
app.get('/crush', async (_request, response) => {
  const crushes = await readerFile();
  response.status(SUCCESS).send(crushes);
});

// Requisito 2
app.get('/crush/:id', async (request, response) => {
  const { id } = request.params;
  const crushes = await readerFile();
  const crush = JSON.parse(crushes).find((element) => element.id === parseInt(id, 10));
  if (!crush) return response.status(NOTFOUND).send(notFoundCrush);
  response.status(SUCCESS).send(crush);
});

// Requisito 4

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.listen(PORT, () => console.log(`Em execução ${PORT}`));
