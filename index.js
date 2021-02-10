const express = require('express');

const fs = require('fs').promises;

const crypto = require('crypto');

const app = express();

const SUCCESS = 200;
const port = 3000;

app.use(express.json());

function generateToken() {
  return crypto.randomBytes(8).toString('hex'); // 16 digitos aleatorios 8bytes
}
function validEmail(email) {
  return /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{3,8})?$/.test(email); // validação emial.
}
function validPassword(password) {
  return /[0-9]{6}/.test(password);
}
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

// Requisito 1
app.get('/crush', async (_req, res) => {
  const data = await fs.readFile('./crush.json');

  if (data.length < 1) {
    res.status(SUCCESS).send([]);
  }

  res.status(SUCCESS).send(JSON.parse(data));
});
// requisito 2
app.get('/crush/:id', async (req, res) => {
  const data = await fs.readFile('./crush.json');

  const { id } = req.params;

  const dataJSON = JSON.parse(data);

  const result = dataJSON.find((el) => el.id === Number(id));

  if (result === undefined) {
    res.status(404).send({ message: 'Crush não encontrado' });
  }

  res.status(SUCCESS).send(result);
});
// desafio 3
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (email === undefined) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (validEmail(email) === false) return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  if (password === undefined) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (validPassword(password) === false) return res.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });

  const token = generateToken();
  return res.send({ token });
});
app.listen(port, () => console.log('working...'));
