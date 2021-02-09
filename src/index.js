const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const SUCCESS = 200;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use(bodyParser.json());
app.listen(3000, () => console.log('running'));
const { readFile } = require('./utils/manageFiles');

// ------- Requisito 1 --------

app.get('/crush', async (_request, response) => {
  const crushes = await readFile('crush');

  try {
    response.status(200).json(JSON.parse(crushes));
  } catch (error) {
    console.log(error);
    response.status(200).json([]);
  }
});

// ------- Requisito 2 --------

app.get('/crush/:id', async (request, response) => {
  const { id } = request.params;
  const myCrushes = await readFile('crush');
  const element = JSON.parse(myCrushes).find((e) => e.id === parseInt(id, 10));

  if (element) {
    response.status(200).json(element);
  } else {
    response.status(404).json({ message: 'Crush não encontrado' });
  }
});
