const express = require('express');
const fs = require('fs');

const port = 3000;
const app = express();
const SUCCESS = 200;
const NOTFOUND = 404;
const NFmessage = { message: 'Crush não encontrado' };
const auth = { token: '7mqaVRXJSp886CGr' };
const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const regexDate = /(\d{2})[/](\d{2})[/](\d{4})/;

function getCrushes() {
  return JSON.parse(fs.readFileSync('./crush.json', 'utf8'));
}

app.use(express.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', (_req, res) => {
  res.status(SUCCESS).send(getCrushes());
});

app.get('/crush/:id', (req, res) => {
  const { id } = req.params;
  const crush = getCrushes().find((e) => e.id === parseInt(id, 10));
  if (!crush) return res.status(NOTFOUND).send(NFmessage);
  res.status(SUCCESS).send(crush);
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || email === '') {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!regex.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password || password === '') {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }
  res.status(SUCCESS).send(auth);
});

app.post('/crush', (req, res) => {
  const { name, age, date } = req.body;
  const { authorization } = req.headers;
  console.log(req.body);
  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorization !== auth.token) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  if (!name || name === '') {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  if (!age || age === '') {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(400).json({ message: 'O crush deve ser maior de idade' });
  }
  if (!date || date === '' || !date.datedAt || date.datedAt === '' || !date.rate || date.rate === '') {
    return res.status(400).json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  }
  if (!regexDate.test(date.datedAt)) {
    return res.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (date.rate !== 1 && date.rate !== 2 && date.rate !== 3 && date.rate !== 4 && date.rate !== 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  const crushes = getCrushes();
  crushes.push(req.body);
  res.status(201).send(req.body);
});

app.listen(port, () => console.log(`Aplicação rodando na porta ${port}!`));
