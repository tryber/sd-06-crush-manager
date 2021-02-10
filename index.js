const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

const SUCCESS = 200;
const CREATED = 201;
const BADREQUEST = 400;
const UNAUTHORIZED = 401;
const NOTFOUND = 404;

const authentication = { token: '7mqaVRXJSp886CGr' };

app.use(express.json());

const checkAuthentication = (request, response, next) => {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.status(UNAUTHORIZED).json({ message: 'Token não encontrado' });
  }
  if (authorization !== authentication.token) {
    return response.status(UNAUTHORIZED).json({ message: 'Token inválido' });
  }

  next();
};

app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

const getAllCrushes = () => JSON.parse(fs.readFileSync('./crush.json', 'utf8'));
const writeFile = async (content) => fs.writeFileSync('./crush.json', content);

app.get('/crush', (_request, response) => {
  response.status(SUCCESS).send(getAllCrushes());
});

app.get('/crush/search', checkAuthentication, (request, response) => {
  const searchText = request.query.q;
  const crushes = getAllCrushes();
  if (!searchText) response.status(SUCCESS).json(crushes);
  console.log('query', searchText);
  console.log('test');
  const crushFound = crushes.filter((crush) => crush.name.includes(searchText));
  response.status(SUCCESS).json(crushFound);
});

app.get('/crush/:id', (request, response) => {
  const { id } = request.params;
  const crushRequired = getAllCrushes().find((crush) => crush.id === +id);
  if (!crushRequired) return response.status(NOTFOUND).json({ message: 'Crush não encontrado' });
  response.status(SUCCESS).json(crushRequired);
});

app.post('/login', (request, response) => {
  const { email, password } = request.body;
  const emailFormat = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/;

  if (!email) {
    return response.status(BADREQUEST).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!emailFormat.test(email)) {
    return response.status(BADREQUEST).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  if (!password) {
    return response.status(BADREQUEST).json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length < 6) {
    return response.status(BADREQUEST).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }

  response.status(SUCCESS).json(authentication);
});

app.use(checkAuthentication);

const validateCrushInformation = (name, age, date) => {
  if (!name) return 'O campo "name" é obrigatório';
  if (name.length < 3) return 'O "name" deve ter pelo menos 3 caracteres';
  if (!age) return 'O campo "age" é obrigatório';
  if (age < 18) return 'O crush deve ser maior de idade';
  if (!date || !date.datedAt || date.rate === undefined) {
    return 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios';
  }

  const validateDate = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
  if (date && !validateDate.test(date.datedAt)) {
    return 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"';
  }

  if (date.rate < 1 || date.rate > 5) return 'O campo "rate" deve ser um inteiro de 1 à 5';

  return 'OK';
};

app.post('/crush', async (request, response) => {
  const { name, age, date } = request.body;
  const message = validateCrushInformation(name, age, date);

  if (message !== 'OK') {
    return response.status(BADREQUEST).json({ message });
  }

  const crushes = getAllCrushes();
  const newCrush = { id: crushes.length + 1, ...request.body };
  const newCrushData = crushes.concat(newCrush);

  await writeFile(JSON.stringify(newCrushData));

  response.status(CREATED).json(newCrush);
});

app.put('/crush/:id', async (request, response) => {
  const { name, age, date } = request.body;
  const message = validateCrushInformation(name, age, date);
  if (message !== 'OK') {
    return response.status(BADREQUEST).json({ message });
  }

  const { id } = request.params;
  const crushes = getAllCrushes();
  const crushNewInfo = ({ name, age, id: +id, date });
  crushes[id] = crushNewInfo;
  await writeFile(JSON.stringify(crushes));

  response.status(SUCCESS).json(crushNewInfo);
});

app.delete('/crush/:id', async (request, response) => {
  const { id } = request.params;
  const filteredCrushes = getAllCrushes().filter((crush) => crush.id !== +id);

  await writeFile(JSON.stringify(filteredCrushes));

  response.status(SUCCESS).json({ message: 'Crush deletado com sucesso' });
});

app.listen(port, console.log('Servidor funcionando'));
