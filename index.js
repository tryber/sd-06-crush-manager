const express = require('express');
const fs = require('fs');
const crushes = require('./crush.json');

const app = express();
const SUCCESS = 200;
const NOTFOUND = 404;
const PORT = 3000;

app.use(express.json());

const getArrayOfCrushes = (response) => {
  const crushesContent = fs.readFileSync('./crush.json', 'utf8');
  const allCrushesInArray = JSON.parse(crushesContent);
  return response.status(SUCCESS).send(allCrushesInArray);
};

const getCrushById = (id, response) => {
  function compareCrushIdWithParams(crush) {
    if (crush.id === parseInt(id, 10)) {
      return response.status(SUCCESS).send(crush);
    }
  }
  crushes.map((crush) => compareCrushIdWithParams(crush));
};

const responseError = (errorCode, message, response) => {
  response.status(errorCode).send({ message });
};

const buildToken = () => {
  // Metodo aprendido a partir desse link: https://qastack.com.br/programming/1349404/generate-random-string-characters-in-javascript
  const tokenComponent = Math.random().toString(36).substring(2, 10);
  const token = tokenComponent + tokenComponent;

  return token;
};

const verifyEmail = (email, response) => {
  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  const isValidEmail = regex.test(email);

  if (!email) {
    return response.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!isValidEmail) {
    return response.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
};

const verifyPassword = (password, response) => {
  const six = 6;

  if (!password) {
    return response.status(400).json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length < six) {
    return response.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }
};

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

// get all crushes
app.get('/crush', (_request, response) => {
  getArrayOfCrushes(response);
});

// get crush by id
app.get('/crush/:id', (request, response) => {
  const { id } = request.params;
  getCrushById(id, response);
  responseError(NOTFOUND, 'Crush não encontrado', response);
});

// send requisition to receive token
app.post('/login', (request, response) => {
  const { email, password } = request.body;

  verifyEmail(email, response);
  verifyPassword(password, response);

  response.status(200).json({ token: buildToken() });
});

app.listen(PORT, console.log(`Server is running on port ${PORT}`));
