const express = require('express');
const routes = require('./routes');

const app = express();
const SUCCESS = 200;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use(routes);

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
