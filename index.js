const express = require('express');
const crushs = require('./crush.json');

const app = express();
const SUCCESS = 200;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', (req, res) => {
  res.status(SUCCESS).json(crushs);
});

app.get('/crush/:id', (req, res) => {
  const { id } = req.params;
  const crush = crushs.find((e) => e.id == id);
  if (crush) {
    return res.status(200).json(crush)
  } else {
    return res.status(404).json({ message: "Crush não encontrado" });
  }
});

app.listen(3000);
