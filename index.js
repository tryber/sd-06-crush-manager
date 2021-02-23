const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const SUCCESS = 200;

const loginRoute = require('./routes/login');
const crushesRoute = require('./routes/crushes');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use(bodyParser.json());

app.use('/crush', crushesRoute);

app.use('/login', loginRoute);

app.listen(3000);
