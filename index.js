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

const dataCrush = read('crush.json');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', (req, res) => {
  res.status(SUCCESS).json(dataCrush);
});

app.get('/crush/:id', (req, res) => {
  if (dataCrush[req.params.id - 1]) {
    res.status(SUCCESS).json(dataCrush[req.params.id - 1]);
  } else {
    res.status(404).json({ "message": "Crush não encontrado" });
  }
});

app.listen(3000);
