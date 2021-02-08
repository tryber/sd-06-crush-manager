const express = require('express');
const bodyParser = require('body-parser');
const { readDatabase } = require('./utils/manageDatabase');

const app = express();
const port = 3000;
const SUCCESS = 200;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', async (_request, response) => {
  const data = await readDatabase();
  response.status(200).json(data);
});

app.get('/crush/:id', async (request, response) => {
  const data = await readDatabase();
  const { id } = request.params;
  const crushRequired = data.find((crush) => crush.id === +id);

  if (!crushRequired) {
    return response.status(404).json({ message: 'Crush não encontrado' });
  }

  response.status(200).json(crushRequired);
});

app.listen(port, console.log('Servidor funcionando'));
