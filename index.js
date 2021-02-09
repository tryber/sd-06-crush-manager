const express = require('express');

const chushRouter = require('./chushRouter');
const loginRouter = require('./loginRouter');

const app = express();
const SUCCESS = 200;
const port = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use((req, _res, next) => {
  console.log({
    data: new Date(),
    method: req.method,
    router: req.originalUrl,
  });
  next();
});

app.use(express.json());

app.use('/crush', chushRouter);

app.use('/login', loginRouter);

app.use((err, _req, res, _next) => {
  res.send(err.message);
});

app.listen(port, () => console.log('running port', port));
