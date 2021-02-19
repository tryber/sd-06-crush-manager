const express = require('express');
const fs = require('fs');

const app = express();
const SUCCESS = 200;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

// requisito 1
app.get('/crush', (_req, res) => {
  const content = fs.readFileSync('./crush.json', 'utf-8');
  if (!content) {
    return res.status(200).json([]);
  }
  return res.status(200).json(JSON.parse(content));
});

// requisito 2
app.get('/crush/:id', (req, res) => {
  const content = fs.readFileSync('./crush.json', 'utf-8');
  const { id } = req.params;
  const filteredCrushes = JSON.parse(content).find((crush) => crush.id === Number(id));
  if (!filteredCrushes) {
    return res.status(404).json({ message: 'Crush não encontrado' });
  }
  return res.status(200).json(filteredCrushes);
});

// requisito 3
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validatePassword(password) {
  return password.toLowerCase().toString();
}
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || email === '') {
    return res.status(400).json(
      {
        message: 'O campo "email" é obrigatório',
      },
    );
  }

  if (!validateEmail) {
    return res.status(400).json(
      {
        message: 'O "email" deve ter o formato "email@email.com"',
      },
    );
  }

  if (!password) {
    return res.status(400).json(
      {
        message: 'O campo "password" é obrigatório',
      },
    );
  }

  if (validatePassword(password).length < 6) {
    return res.status(400).json(
      {
        message: 'A "senha" deve ter pelo menos 6 caracteres',
      },
    );
  }
  return res.status(200).json(
    {
      token: '7mqaVRXJSp886CGr',
    },
  );
});

// Requisito 4

app.post('/', async (req, res) => {
  const {name, age, }
})

app.listen(3000, () => console.log('ouvindo na porta 3000'));
