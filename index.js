const express = require('express');
const fs = require('fs').promises;
const crypto = require('crypto');
const bodyParser = require('body-parser');

const app = express();
const SUCCESS = 200;
const port = 3000;
const token = crypto.randomBytes(16).toString('hex');

app.use(bodyParser.json());

async function getCrushes() {
  const data = await fs.readFile('./crush.json');
  return JSON.parse(data);
}

async function checkEmail(email) {
  const emailRegex = /\S+@\S+\.\S+/i;
  return emailRegex.test(email);
}

async function checkPass(pass) {
  if (pass.toString().length > 5) return true;
  return false;
}

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', async (_request, response) => {
  const crushes = await getCrushes();
  response.status(SUCCESS).json(crushes);
});

app.get('/crush/:id', async (request, response) => {
  const crushes = await getCrushes();
  const msg = { message: 'Crush não encontrado' };
  const { id } = request.params;
  const match = crushes.find((crush) => crush.id === +id);

  if (match) return response.status(SUCCESS).json(match);
  response.status(404).json(msg);
});

app.post('/login', async (request, response) => {
  const { email, password } = request.body;
  console.log(email, password);
  const validEmail = await checkEmail(email);
  const validPass = await checkPass(password);
  // const msgs = {
  //   noEmail: { message: 'O campo "email" é obrigatório' },
  //   invalidEmail: { message: 'O "email" deve ter o formato "email@email.com"' },
  //   noPassword: { message: 'O campo "password" é obrigatório' },
  //   invalidPassword: { message: 'O "password" ter pelo menos 6 caracteres' },
  // };

  if (validEmail && validPass) return response.status(SUCCESS).json(token);

  response.status(403).json({ message: 'Inválido' });
});

app.listen(port, () => console.log(`Listening to port ${port}!`));
