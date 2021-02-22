const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
app.use(bodyParser.json());

const crushList = require('./middlewares/crushList');

const crushId = require('./middlewares/crushId');

const SUCCESS = 200;

app.use((req, res, next) => {
  console.log({
    date: new Date(),
    method: req.method,
    endPoint: req.originalUrl,
  });
  res.on('finish', () => {
    console.log({
      date: new Date(),
      method: req.method,
      endPoint: req.originalUrl,
    });
  });
  next();
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', crushList);
app.get('/crush/:id', crushId);

app.listen(port, () => console.log(`Serviço rodando na porta ${port}`));
