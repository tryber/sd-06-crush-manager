const express = require('express');
const fs = require('fs');
const crushes = require('./crush.json');

const app = express();
const SUCCESS = 200;
const NOTFOUND = 404;
const PORT = 3000;

app.use(express.json());

const getArrayOfCrushes = () => {
  const crushesContent = fs.readFileSync('./crush.json', 'utf8');
  return JSON.parse(crushesContent);
};

const crushById = (id, res) => {
  function compareCrushIdWithParams(crush) {
    if (crush.id === parseInt(id, 10)) {
      return res.status(SUCCESS).send(crush);
    }
  }
  crushes.map((crush) => compareCrushIdWithParams(crush));
};

const responseError = (cod, message, res) => {
  res.status(cod).send({ message });
};

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

// get all crushes
app.get('/crush', (_req, res) => {
  res.status(SUCCESS).send(getArrayOfCrushes());
});

// get crush by id
app.get('/crush/:id', (req, res) => {
  const { id } = req.params;
  crushById(id, res);
  responseError(NOTFOUND, 'Crush não encontrado', res);
});

app.listen(PORT, console.log(`Server is running on port ${PORT}`));
