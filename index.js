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
  return JSON.parse(response);
};

// const write = async (arquivo, obj) => {
//   await fs.writeFile(path.resolve(path.join(__dirname, arquivo)), obj, 'utf-8');
//   return true;
// };

app.get('/crush', async (_request, response) => {
  const func = await read('./crush.json');
  response.status(200).json(func);
});

app.get('/crush/:id', async (request, response) => {
  const { id } = request.params;
  const func = await read('./crush.json');
  const ator = func.find((el) => el.id === +id);
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

const geradordeToken = (length) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let index = 0; index < length; index += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const confereSenha = (senha) => {
  if (senha.toString().length === 0) return null;
  if (senha.toString().length < 6) return false;
};

app.post('/login', async (request, response) => {
  const { email, password } = request.body;

  if (confereEmail(email) === false) {
    return response.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }
  if (confereEmail(email) === null) {
    return response.status(400).json({
      message: 'O campo "email" é obrigatório',
    });
  }
  if (confereSenha(password) === null) {
    return response.status(400).json({
      message: 'O campo "password" é obrigatório',
    });
  }
  if (confereSenha(password) === false) {
    return response.status(400).json({
      message: 'A "senha" deve ter pelo menos 6 caracteres',
    });
  }
  return response.status(200).json({ token: geradordeToken(16) });
});

app.post('/crush', async (request, response) => {
  const { name, age, date } = request.body;
  const { authorization } = request.headers;
  if (!authorization) {
    return response.status(401).json({
      message: 'Token não encontrado',
    });
  }
  if (authorization.length !== 16) {
    return response.status(401).json({
      message: 'Token inválido',
    });
  }
  if (name.length === 0) {
    return response.status(400).json({
      message: 'O campo "name" é obrigatório',
    });
  }
  if (name.length < 3) {
    return response.status(400).json({
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }
  if (age.length === 0) {
    return response.status(400).json({
      message: 'O campo "age" é obrigatório',
    });
  }
  if (age < 18) {
    return response.status(400).json({
      message: 'O crush deve ser maior de idade',
    });
  }
  if (date.datedAt) {
    return response.status(400).json({
      message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  return response.status(200).json(request.body);
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
