const express = require('express');
const router = require('./routes');

const app = express();
const SUCCESS = 200;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use(router);

app.listen(3000, () => console.log('listening'));
