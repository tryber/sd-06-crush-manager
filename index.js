const express = require('express');
const fs = require('fs');

const app = express();
const SUCCESS = 200;

const read = (file) => {
  try {
    const data = fs.readFileSync(file, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error: ${err}`);
  }
};

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', (req, res) => {
  res.status(SUCCESS).json(read('crush.json'));
});

app.listen(3000);
