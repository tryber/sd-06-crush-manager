const express = require('express');
const bodyParser = require('body-parser');

const { readFile } = require('./util/manageFiles');

const app = express();
const SUCCESS = 200;
const port = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use(bodyParser.json());
app.use((request, _response, next) => {
  console.log({
    data: new Date(),
    method: request.method,
    route: request.originalUrl,
  });
  next();
});

app.get('/:fileName', async (request, response) => {
  const { fileName } = request.params;
  const myFile = await readFile(fileName);
  response.status(SUCCESS).json(JSON.parse(myFile));
});

app.listen(port, () => console.log(`Executando na porta ${port}`));
