const express = require('express');
const bodyParser = require('body-parser');//
const { readFile } = require('./utils/manageFiles');//

const app = express();
const SUCCESS = 200;
const port = 3000;//
const Erro404 = 404;

app.use(bodyParser.json());//

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});
//

// 1 - Crie o endpoint GET /crush
app.get('/crush', async (_request, response) => {
  const crushs = await readFile();
  response.status(SUCCESS).json(crushs);
});

// 2 - Crie o endpoint GET /crush/:id
app.get('/crush/:id', async (request, response) => {
  const crushs = await readFile();
  const id = parseInt(request.params.id, 10);
  const crushId = crushs.find((crush) => crush.id === id);
  if (!crushId) response.status(Erro404).json({ message: 'Crush não encontrado' });
  response.status(SUCCESS).json(crushId);
});

app.listen(port);
