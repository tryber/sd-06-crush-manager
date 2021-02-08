const express = require('express');
const { logger, getCrushs } = require('./middlewares');

const app = express();
const SUCCESS = 200;
app.use(logger);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', getCrushs);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`O PAI TÁ ON ${PORT} VEZES!`);
});
