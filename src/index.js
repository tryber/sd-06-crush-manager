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

// ------- Requisito 1 --------

const { readFile } = require('./utils/manageFiles');

app.get('/crush', async (_request, response) => {
  const crushes = await readFile('crush');

  try {
    response.status(200).send(crushes);
  } catch (error) {
    console.log(error);
    response.status(200).json([]);
  }
});
