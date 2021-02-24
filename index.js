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

const write = async (arquivo, obj) => {
  await fs.writeFile(path.resolve(path.join(__dirname, arquivo)), obj, 'utf-8');
  return true;
};

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
  if (!senha) return null;
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

const validateLogin = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      message: 'Token não encontrado',
    });
  }
  if (authorization.length !== 16) {
    return res.status(401).json({
      message: 'Token inválido',
    });
  }
  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({
      message: 'O campo "name" é obrigatório',
    });
  }
  if (name.length < 3) {
    return res.status(400).json({
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }
  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    return res.status(400).json({
      message: 'O campo "age" é obrigatório',
    });
  }
  if (age < 18) {
    return res.status(400).json({
      message: 'O crush deve ser maior de idade',
    });
  }
  next();
};

const validateDate = (req, res, next) => {
  const { date } = req.body;
  if (!date || !date.datedAt || !date.rate) {
    return res.status(400).json({
      message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    });
  }
  const confereData = (data) => {
    const regex = /\d{2}\/\d{2}\/\d{4}/g;
    return regex.test(data);
  };
  if (confereData(date.datedAt) === false) {
    return res.status(400).json({
      message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  if (date.rate > 5 || date.rate < 1) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }
  next();
};

app.post('/crush', validateLogin, validateName, validateAge, validateDate, async (request, response) => {
  write('./crush.json', { id: 5, ...request.body });
  response.status(201).json({ id: 5, ...request.body });
});

const validateDate2 = (req, res, next) => {
  const { date } = req.body;
  if (!date || !date.datedAt || date.rate === undefined || date.rate === null || date.rate === '' || Number.isNaN(date.rate)) {
    return res.status(400).json({
      message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    });
  }
  const confereData = (data) => {
    const regex = /\d{2}\/\d{2}\/\d{4}/g;
    return regex.test(data);
  };
  if (confereData(date.datedAt) === false) {
    return res.status(400).json({
      message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  if (date.rate > 5 || date.rate < 1 || date.rate === 0) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }
  next();
};

app.put('/crush/:id', validateLogin, validateName, validateAge, validateDate2, async (req, res) => {
  const { id } = req.params;
  write('./crush.json', { id, ...req.body });
  res.status(200).json({ id: 5, ...req.body });
});

app.delete('/crush/:id', validateLogin, async (req, res) => {
  const { id } = req.params;
  write('./crush.json', { id });
  res.status(200).json({ message: 'Crush deletado com sucesso' });
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
