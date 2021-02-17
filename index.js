const express = require('express');
const bodyParser = require('body-parser');
const crushRouter = require('./routes/crush');
const loginRouter = require('./routes/login');

const app = express();
const SUCCESS = 200;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use(bodyParser.json());
app.use(crushRouter);
app.use(loginRouter);

app.listen(3000);
