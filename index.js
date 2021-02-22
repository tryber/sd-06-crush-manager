const express = require('express');
const bodyParser = require('body-parser');
const { readFile, writeFile } = require('./utils/manageFiles.js');
// const writeFile = require('./utils/manageFiles');
const geraToken = require('./generateToken');

const app = express();
const SUCCESS = 200;
const PORT = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', async (_req, res) => {
  const result = await readFile();
  if (result === []) return res.status(200).json('[]');
  res.status(200).send(result);
});

app.get('/crush/:id', async (req, res) => {
  const { id } = req.params;
  const result = await readFile();
  const filteredID = await result.find((crush) => crush.id === parseInt(id, 10));
  if (filteredID === undefined) return res.status(404).send({ message: 'Crush não encontrado' });
  res.status(200).send(filteredID);
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email === '' || !email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });

  const emailMask = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  if (emailMask.test(email) === false) return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });

  if (password === '' || !password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (password.length < 6) return res.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });

  const token = geraToken();
  res.status(200).json({ token });
});

app.post('/crush', async (req, res) => {
  const { token } = req.headers;
  const { name, age, date } = req.body;

  if (!token) return res.status(401).json({ message: 'Token não encontrado' });
  if (token.lenght < 16) return res.status(401).json({ message: 'Token inválido' });

  if (!name || name === '') return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (name.length < 3) return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });

  if (!age || age === '') return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (age < 18) return res.status(400).json({ message: 'O crush deve ser maior de idade' });

  const valiDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
  if (valiDate.test(date.datedAt) === false) return res.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });

  if (date.rate < 0 && date.rate > 5) {
    return res.status(400)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  if (!date || date === '' || !date.datedAt || date.datedAt === '' || !date.rate || date.rate === '') {
    console.log(date);
    return res.status(400)
      .json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  }

  const result = await readFile();
  const newCrush = { name, age, id: result.length + 1, date };
  result.push(newCrush);
  await writeFile(JSON.stringify(result));
  const retorno = {
    id: newCrush.id,
    name: newCrush.name,
    age: newCrush.age,
    date: {
      datedAt: newCrush.date.datedAt,
      rate: newCrush.date.rate,
    },
  };

  res.status(201).json(retorno);
});

app.listen(PORT, () => console.log('Server rolando na porta %s', PORT));
