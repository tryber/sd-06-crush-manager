const express = require('express');
const fs = require('fs');

const app = express();
const SUCCESS = 200;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', (req, res) => {
  fs.readFile('./crush.json', 'utf8', (err, data) => {
    if (!data) {
      res.sataus(SUCCESS).send('[]');
    }
    res.status(SUCCESS).send(data);
  });
});

app.listen(3000);
