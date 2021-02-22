const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const crypto = require('crypto');
const { readFile } = require('./utils/manage');

const app = express();
const SUCCESS = 200;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', async (req, res) => {
  const crushFile = await readFile();
  res.status(200).send(crushFile);
});

app.get('/crush/:id', async (req, res) => {
  const crushFile = await readFile();
  const { id } = req.params;
  const selected = crushFile.find((elem) => elem.id === parseInt(id, 10));
  if (!selected) res.status(404).send({ message: 'Crush não encontrado' });
  res.status(200).send(selected);
});

app.post('/login', (req, res) => {
  // validação com regex: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  // criação de token: https://qastack.com.br/programming/8855687/secure-random-token-in-node-js
  const { email, password } = req.body;
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!email || email === '') res.status(400).send({ message: 'O campo "email" é obrigatório' });
  if (!(regex.test(String(email).toLocaleLowerCase())) || !email || email === '') res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  if (!password || password === '') res.status(400).send({ message: 'O campo "password" é obrigatório' });
  if (password.length < 6) res.status(400).send({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  const token = crypto.randomBytes(8).toString('hex');
  req.body = { token };
  res.status(200).send(req.body);
});

app.post('/crush', async (req, res) => {
  const { name, age, date } = req.body;
  const { authorization } = req.headers;
  const crushFile = await readFile();
  const id = crushFile.length + 1;
  const newCrush = { name, age, id, date };

  if (!authorization || authorization === '') return res.status(401).send({ message: 'Token não encontrado' });
  if (authorization.length !== 16) return res.status(401).send({ message: 'Token inválido' });
  if (!name || name === '') return res.status(400).send({ message: 'O campo "name" é obrigatório' });
  if (name.length < 3) return res.status(400).send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  if (!age || age === '') return res.status(400).send({ message: 'O campo "age" é obrigatório' });
  if (age < 18) return res.status(400).send({ message: 'O crush deve ser maior de idade' });
  if (!date || date.datedAt === '' || date.rate === '' || !date.datedAt || !date.rate) return res.status(400).send({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  const regex = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
  if (!(regex.test(date.datedAt))) return res.status(400).send({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  if (date.rate < 1 || date.rate > 5) return res.status(400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });

  crushFile.push(newCrush);
  fs.writeFileSync('crush.json', JSON.stringify(crushFile));
  return res.status(201).send(newCrush);
});

app.put('/crush/:id', async (req, res) => {
  const { name, age, date } = req.body;
  const { authorization } = req.headers;
  const crushFile = await readFile();
  const { id } = req.params;
  const newCrush = { name, age, id: Number(id), date };

  if (!authorization || authorization === '') return res.status(401).send({ message: 'Token não encontrado' });
  if (authorization.length !== 16) return res.status(401).send({ message: 'Token inválido' });
  if (!name || name === '') return res.status(400).send({ message: 'O campo "name" é obrigatório' });
  if (name.length < 3) return res.status(400).send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  if (!age || age === '') return res.status(400).send({ message: 'O campo "age" é obrigatório' });
  if (age < 18) return res.status(400).send({ message: 'O crush deve ser maior de idade' });
  if (!date || date.datedAt === '' || date.rate === '' || !date.datedAt || date.rate === undefined) return res.status(400).send({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  const regex = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
  if (!(regex.test(date.datedAt))) return res.status(400).send({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  if (date.rate < 1 || date.rate > 5) return res.status(400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });

  const crushNewFile = crushFile.map((elem) => {
    if (elem.id === newCrush.id) {
      return newCrush;
    }
    return elem;
  });

  fs.writeFileSync('crush.json', JSON.stringify(crushNewFile));
  return res.status(200).send(newCrush);
});

app.delete('/crush/:id', async (req, res) => {
  const { authorization } = req.headers;
  const { id } = req.params;
  const crushFile = await readFile();

  if (!authorization || authorization === undefined || authorization === '') return res.status(401).send({ message: 'Token não encontrado' });
  if (authorization.length !== 16) return res.status(401).send({ message: 'Token inválido' });

  const crushNewFile = crushFile.filter((crush) => crush.id !== Number(id));
  fs.writeFileSync('crush.json', JSON.stringify(crushNewFile));
  return res.status(200).send({ message: 'Crush deletado com sucesso' });
});

app.listen(3000, () => console.log('Ouvindo na porta: ', 3000));
