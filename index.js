const express = require('express');
// const { FrisbySpec } = require('frisby');
// const fs = require('fs');
const crushRouter = require('./rotes/crushRotes');

const loginRouter = require('./rotes/loginRote');

const verifyToken = require('./functions/verifyToken');

const app = express();
const SUCCESS = 200;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', crushRouter);

app.get('/crush/:id', crushRouter);

app.post('/login', loginRouter);

app.use((req, res, next) => {
  const { authorization } = req.headers;

  const checkToken = verifyToken(authorization);

  if (checkToken !== true) return res.status(401).send({ message: checkToken });

  next();
});

app.post('/crush', crushRouter);

app.put('/crush/:id', crushRouter);

app.delete('/crush/:id', crushRouter);

app.listen(3000, () => console.log('Crush Manager running on 3000 port!'));
