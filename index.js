const express = require('express');

const chushRouter = require('./chushRouter');

const app = express();
const SUCCESS = 200;
const port = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

// app.use((req, _res, next) => {
//   console.log({
//     data: new Date(),
//     method: req.method,
//     router: req.originalUrl,
//   });
//   next();
// });

app.use('/crush', chushRouter);

app.listen(port, () => console.log('running port', port));
