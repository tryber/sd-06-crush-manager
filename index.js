const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const SUCCESS = 200;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

const read = async (arquivo) => {
  const response = await fs.readFile(path.resolve(path.join(__dirname, arquivo)), 'utf-8');
  console.log(response);
  return JSON.parse(response);
};

// const write = async (arquivo, obj) => {
//   await fs.writeFile(path.resolve(path.join(__dirname, arquivo)), obj, 'utf-8');
//   return true;
// };

app.get('/crush', async (_request, response) => {
  const fun = await read('./crush.json');
  response.status(200).json(fun);
});

app.get('/crush/:id', async (request, response) => {
  const { id } = request.params;
  const fun = await read('./crush.json');
  const ator = fun.find((el) => el.id === +id);
  if (!ator) {
    response.status(404).json({
      message: 'Crush não encontrado',
    });
  }
  response.status(200).json(ator);
});

const confereEmail = (email) => {
  const regex = /^[a-zA-Z0-9]+@[a-z]+\.com$/;
  if (!email) return null;
  return regex.test(email);
};

const geradordeToken = () => {
  const token = Math.random()
    .toString(36).substring(2, 20);
  return token;
};

const confereSenha = (senha) => {
  if (senha.toString().length === 0) {
    return null;
  }
  if (senha.toString().length < 6) {
    return false;
  }
};

app.post('/login', async (request, response) => {
  console.log(request.body);
  const { email, password } = request.body;

  if (confereEmail(email) === false) {
    response.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }
  if (confereEmail(email) === null) {
    response.status(400).json({
      message: 'O campo "email" é obrigatório',
    });
  }
  if (confereSenha(password) === null) {
    response.status(400).json({
      message: 'O campo "password" é obrigatório',
    });
  }
  if (confereSenha(password) === false) {
    response.status(400).json({
      message: 'A "senha" deve ter pelo menos 6 caracteres',
    });
  }
  return response.status(200).json({ token: geradordeToken() });
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
