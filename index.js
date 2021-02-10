const express = require('express');
const readFile = require('./util/readFile');
const writeFile = require('./util/writeFile');
const tokenGenerator = require('./util/tokenGenerator');

const app = express();
app.use(express.json());
const SUCCESS = 200;
const port = 3000;

function auth(request, response, next) {
  const { authorization } = request.headers;
  const onlyNumbersValidator = /^\d+$/;
  const noNumbersValidator = /^[^0-9()]+$/;
  const alphanumericValidator = /^\w+$/;
  const isItOnlyNumbers = onlyNumbersValidator.test(String(authorization).toLowerCase());
  const isItOnlyLetters = noNumbersValidator.test(String(authorization).toLowerCase());
  const isItAlphanumerical = alphanumericValidator.test(String(authorization).toLowerCase());

  if (!authorization) {
    return response.status(401).send({ message: 'Token não encontrado' });
  }

  if (authorization.length < 16) {
    return response.status(401).send({ message: 'Token inválido' });
  }

  if (!isItAlphanumerical || isItOnlyNumbers || isItOnlyLetters) {
    return response.status(401).send({ message: 'Token inválido' });
  }

  next();
}

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

// challenge 1
app.get('/crush', async (_request, response) => {
  const fileData = await readFile('crush.json');

  if (!fileData) {
    return response.status(200).send(fileData);
  }

  return response.status(200).send(fileData);
});

// challenge 2
app.get('/crush/:id', async (request, response) => {
  const { id } = request.params;
  const fileData = await readFile('crush.json');
  const chosenCrush = fileData.find((crush) => crush.id === parseInt(id, 10));

  if (!chosenCrush) {
    return response.status(404).send({ message: 'Crush não encontrado' });
  }

  response.status(200).send(chosenCrush);
});

// challenge 3
app.post('/login', (request, response) => {
  const { email, password } = request.body;
  const token = tokenGenerator();
  const emailValidator = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!email || email.length === 0) {
    return response.status(400).send({ message: 'O campo "email" é obrigatório' });
  }

  if (!emailValidator.test(String(email).toLowerCase())) {
    return response.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  if (!password || password.length === 0) {
    return response.status(400).send({ message: 'O campo "password" é obrigatório' });
  }

  if (password && password.length < 6) {
    return response.status(400).send({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }

  response.status(200).send({ token });
});

// challenge 4
app.post('/crush', auth, async (request, response) => {
  const { name, age, date } = request.body;

  if (!name) {
    return response.status(400).send({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 3) {
    return response.status(400).send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  if (!age || age.length === 0) {
    return response.status(400).send({ message: 'O campo "age" é obrigatório' });
  }

  if (age < 18) {
    return response.status(400).send({ message: 'O crush deve ser maior de idade' });
  }

  // maybe it should be after rate checking because it is presented that way on readme
  if (!date || !date.datedAt || !date.rate) {
    return response.status(400).send({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  }

  const dateIsNotFormattedCorrectly = date.datedAt.substring(2, 3) !== '/' && date.datedAt.substring(5, 6) !== '/';
  if (dateIsNotFormattedCorrectly) {
    return response.status(400).send({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  const rateIsWithinRange = (date.rate > 0) && (date.rate < 6);
  if (typeof date.rate === 'number' && !rateIsWithinRange) {
    return response.status(400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  const allCrushes = await readFile('crush.json');
  const newCrush = {
    id: allCrushes.length + 1,
    name,
    age,
    date,
  };
  await writeFile(newCrush);

  return response.status(201).send(newCrush);
});

app.listen(port, () => console.log('Example app listening on port 3000!'));
