const express = require('express');
const fs = require('fs');
const crypto = require('crypto');

const app = express();
app.use(express.json());

const SUCCESS = 200;

// Necessário para o avaliador
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', async (req, res) => {
  if (res.statusCode === SUCCESS) {
    res.send(JSON.parse(fs.readFileSync('./crush.json')));
  }
});

app.get('/crush/:id', async (req, res) => {
  const { id: paramID } = req.params;
  const file = await fs.readFileSync('./crush.json');
  const checkIfTheUserExists = file.some((id) => id === Number(paramID));

  if (!checkIfTheUserExists) res.status(404).json({ message: 'Crush não encontrado' });

  const response = JSON.parse(file).find((people) => people.id === Number(paramID));
  res.status(200).json(response);
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const emailFormat = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/;

  if (!email) {
    return res.status(404).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!emailFormat.test(email)) {
    return res.status(404).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  if (!password) {
    return res.status(404).json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length < 6) {
    return res.status(404).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }

  return new Promise((fulfill, reject) => {
    crypto.randomBytes(8, (error, buf) => {
      if (error) {
        reject(error);
      } else {
        const GeneratedToken = buf.toString('hex');
        fulfill(GeneratedToken);
        res.status(200).json({ token: GeneratedToken });
      }
    });
  });
});

app.listen(3000, () => {
  console.log('ouvindo a porta 3000');
});
