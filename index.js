const express = require('express');
// const { readFile, writeFile } = require ('./utils/manageFiles');
const routes = require('./routes');

const app = express();
const SUCCESS = 200;

app.use(express.json());
app.use(routes);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.listen(3000, () => console.log('Em execução'));
