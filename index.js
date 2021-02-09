const express = require('express');
const bodyParser = require('body-parser');//
const { readFile } = require('./utils/manageFiles');//

const app = express();
const SUCCESS = 200;
const port = 3000;//
const Erro404 = 404;//
const Erro400 = 400;//

app.use(bodyParser.json());//

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});
//

// 1 - Crie o endpoint GET /crush
app.get('/crush', async (_request, response) => {
  const crushs = await readFile();
  response.status(SUCCESS).json(crushs);
});

// 2 - Crie o endpoint GET /crush/:id
app.get('/crush/:id', async (request, response) => {
  const crushs = await readFile();
  const id = parseInt(request.params.id, 10);
  const crushId = crushs.find((crush) => crush.id === id);
  if (!crushId) response.status(Erro404).json({ message: 'Crush não encontrado' });
  response.status(SUCCESS).json(crushId);
});

// 3 - Crie o endpoint POST /login
const smsMandatoryEmail = { message: 'O campo "email" é obrigatório' };
const mandatoryEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const smsEmailNull = { message: 'O "email" deve ter o formato "email@email.com"' };
const smsMandatoryPassword = { message: 'O campo "password" é obrigatório' };
const smsPasswordNull = { message: 'A "senha" deve ter pelo menos 6 caracteres' };
const token = { token: '7mqaVRXJSp886CGr' };

app.post('/login', (request, response) => {
  const { email, password } = request.body;
  if (!email || email === '') return response.status(Erro400).send(smsMandatoryEmail);
  if (!mandatoryEmail.test(email)) return response.status(Erro400).send(smsEmailNull);
  if (!password || password === '') return response.status(Erro400).send(smsMandatoryPassword);
  if (password.toString().length < 6) {
    return response.status(Erro400).send(smsPasswordNull);
  }
  response.status(SUCCESS).send(token);
});

app.listen(port, () => console.log(`Start http://localhost:${port}`));
