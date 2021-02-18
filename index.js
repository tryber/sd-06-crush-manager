const express = require('express');

const app = express();
const SUCCESS = 200;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, res) => {
  // response.status(SUCCESS).send();
  res.send('ok');
});

app.listen(3000);
