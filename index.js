const express = require('express');
const bodyParser = require('body-parser');
const { readMyFile, getCrushByID, error, generateToken, validateEmail, validatePassword } = require('./manageFiles/middlewares');

const app = express();
const SUCCESS = 200;
const port = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use((req, res, next) => {
  console.log({
    data: new Date(),
    method: req.method,
    route: req.originalUrl,
  });
  next();
});

app.get('/:fileName', readMyFile);
app.get('/:fileName/:id', getCrushByID);
app.post('/login', validateEmail, validatePassword, generateToken);

app.use(error);

app.listen(port, () => console.log('Running Project Crush Manager!'));
