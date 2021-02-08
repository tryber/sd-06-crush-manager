const express = require('express');
// const bodyParser = require('body-parser');
const router = require('./routes');

const app = express();
const SUCCESS = 200;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

// app.use('/', bodyParser);
app.all(/^\//, router);

app.listen(8080, () => console.log('Listening on port 8080'));
