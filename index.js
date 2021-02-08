const express = require('express');
const fs = require('fs');

const port = 3000;
const app = express();
const SUCCESS = 200;
const NOTFOUND = 404;
const NFmessage = { message: 'Crush não encontrado' };
const auth = { token: '7mqaVRXJSp886CGr' };
const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

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

app.listen(port, () => console.log(`Aplicação rodando na porta ${port}!`));
