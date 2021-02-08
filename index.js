const express = require('express');
const bodyParser = require('body-parser');

const crushes = require('./getCrushes');
const login = require('./login');

const app = express();

app.use(bodyParser.json());

app.use('/crush', crushes);

app.use('/login', login);

const SUCCESS = 200;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.listen(3000);
