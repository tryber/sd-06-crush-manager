const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;
const SUCCESS = 200;
const NOTFOUND = 404;
const BADREQUEST = 400;

const token = { token: '7mqaVRXJSp886CGr' };

app.use(express.json());

app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

const getAllCrushes = () => JSON.parse(fs.readFileSync('./crush.json', 'utf8'));

app.get('/crush', (request, response) => {
  response.status(SUCCESS).send(getAllCrushes());
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

  response.status(SUCCESS).json(token);
});

// app.post('/crush', addNewCrush);

// app.put('/crush/:id', editCrushInformation);

// app.delete('/crush/:id', deleteCrush);

// app.get('/crush/search?q=searchTerm', searchCrushByTerm);

app.listen(port, console.log('Servidor funcionando'));
