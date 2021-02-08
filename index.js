const express = require('express');
const bodyParser = require('body-parser');
const { readFile } = require('./src/readFile');

const app = express();
const SUCCESS = 200;

app.listen(3000, () => {
  console.log('Ouvindo a porta 3000')
});

app.use(bodyParser.json());
app.use((request, response, next) => {
  console.log({
    Date: new Date(),
    Method: request.method,
    URL: request.originalUrl
  });

  next();
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get("/crush", (request, response) => {
  
});