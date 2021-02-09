const express = require('express');
const crushes = require('./crush.json');

const app = express();
const SUCCESS = 200;
const PORT = 3000;

const crushById = (id, res) => {
  function compareCrushIdWithParams(crush) {
    if (crush.id === parseInt(id, 10)) {
      return res.status(200).send(crush);
    }
  }
  crushes.map((crush) => compareCrushIdWithParams(crush));
};

const err404 = (res, message) => {
  res.status(404).send({ message });
};

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

// get all crushes
app.get('/crush', (_req, res) => {
  res.status(200).send(crushes);
}).listen(PORT, console.log(`Server is running on port ${PORT}`));

// get crush by id
app.get('/crush/:id', (req, res) => {
  const { id } = req.params;
  crushById(id, res);
  err404(res, 'Crush não encontrado');
});
