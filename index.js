const express = require('express');
const fs = require('fs');

const app = express();
const SUCCESS = 200;
const port = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', (req, res) => {
  fs.readFile('./crush.json', (err, data) => {
    // if (err) return console.error(err);
    // console.log(data.toString());
    res.status(200).send(data.toString());
  });
});

app.listen(port);
