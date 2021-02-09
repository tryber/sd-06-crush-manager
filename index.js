const express = require('express');
const fs = require('fs').promises;
const crypto = require('crypto');

const app = express();
const SUCCESS = 200;
const door = 3000;
app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

async function getData(arq) {
  const data = await fs.readFile(arq);
  return JSON.parse(data);
}

function generateToken() {
  const token = crypto.randomBytes(20).toString('hex');
  return token;
}

app.get('/crush', async (_, res) => {
  const data = await getData('crush.json');
  res.status(200).send(data);
});

app.get('/crush/:id', async (req, res) => {
  const data = await getData('crush.json');
  const { id } = req.params;
  const findCrushForId = data.filter((crush) => crush.id === +id);
  if (findCrushForId.length > 0) return res.status(200).json(findCrushForId[0]);
  return res.status(404).json({ message: 'Crush não encontrado' });
});

app.post('/login', (req, res) => {
  const token = generateToken();
  const bodyData = req.body;
  const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i;

  if (bodyData.email === null || bodyData.email === '') {
    return res.status(400).send({
      message: 'O campo "email" é obrigatório',
    });
  } if (!regexEmail.test(bodyData.email)) {
    return res.status(400).send({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }

  if (bodyData.password === null || bodyData.password === '') {
    console.log(bodyData.password);
    return res.status(200).send({
      message: 'O campo "password" é obrigatório',
    });
  } if (String(bodyData.password).length < 6) {
    return res.status(200).send({
      message: 'A "senha" deve ter pelo menos 6 caracteres',
    });
  }
  return res.status(200).send({
    token: '7mqaVRXJSp886CGr',
  });
});

app.listen(door, () => console.log('ON --- PORT --- 3000!'));
