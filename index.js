const express = require('express');
const fs = require('fs');
const crypto = require('crypto');

const app = express();
const SUCCESS = 200;

app.use(express.json());

const read = async () => {
  const data = await fs.readFileSync('crush.json', 'utf8');
  return JSON.parse(data);
};

const valEmail = (email) => {
  const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.com$/i;
  return emailRegex.test(email);
};

const valPassword = (password) => {
  if (!password) {
    return false;
  }
  const validate = password.toString();
  return validate.length >= 6;
};

const valDate = (date) => {
  const dateRegex = /^(0?[1-9]|[12][0-9]|3[01])[/](0?[1-9]|1[012])[/]\d{4}$/;
  return dateRegex.test(date);
};

const valToken = (token) => {
  const tokenRegex = /^(\d|\w){16}$/gm;
  return tokenRegex.test(token);
};

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', async (req, res) => {
  const dataCrush = await read();
  res.status(SUCCESS).send(dataCrush);
});

app.get('/crush/search', async (req, res) => {
  const { authorization } = req.headers;
  const { q } = req.query;
  const dataCrush = await read();

  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
  if (valToken(authorization)) {
    if (!q) return res.status(SUCCESS).send(dataCrush);

    const query = dataCrush.filter((elem) => elem.name.match(q));

    res.status(SUCCESS).json(query);
  } else {
    res.status(401).json({ message: 'Token inválido' });
  }
});

app.get('/crush/:id', async (req, res) => {
  const dataCrush = await read();
  if (dataCrush[req.params.id - 1]) {
    res.status(SUCCESS).json(dataCrush[req.params.id - 1]);
  } else {
    res.status(404).json({ message: 'Crush não encontrado' });
  }
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!valEmail(email)) return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (!valPassword(password)) return res.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  if (valEmail(email) && valPassword(password)) {
    const token = crypto.randomBytes(8).toString('hex');
    res.status(SUCCESS).json({ token });
  }
});

app.post('/crush', async (req, res) => {
  const { authorization } = req.headers;
  const { name, age, date } = req.body;

  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
  if (valToken(authorization)) {
    if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    if (name.length < 3) return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    if (age < 18) return res.status(400).json({ message: 'O crush deve ser maior de idade' });
    if (!date || !date.datedAt || !date.rate) return res.status(400).json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
    if (!valDate(date.datedAt)) return res.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
    if (date.rate < 1 || date.rate > 5) return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });

    const dataCrush = await read();
    const newCrush = { id: dataCrush.length + 1, ...req.body };
    const addCrush = dataCrush.concat(newCrush);

    fs.writeFileSync('crush.json', JSON.stringify(addCrush));
    res.status(201).json(newCrush);
  } else {
    res.status(401).json({ message: 'Token inválido' });
  }
});

app.put('/crush/:id', async (req, res) => {
  const { authorization } = req.headers;
  const { name, age, date } = req.body;
  const { id } = req.params;
  const dataCrush = await read();

  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
  if (valToken(authorization)) {
    if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    if (name.length < 3) return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    if (age < 18) return res.status(400).json({ message: 'O crush deve ser maior de idade' });
    if (!date || !date.datedAt || date.rate === undefined) return res.status(400).json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
    if (!valDate(date.datedAt)) return res.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
    if (date.rate < 1 || date.rate > 5) return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });

    const item = {
      id: +id,
      name,
      age,
      date,
    };

    const edit = dataCrush.map((elem) => {
      if (elem.id === +id) {
        return item;
      }
      return elem;
    });

    fs.writeFileSync('crush.json', JSON.stringify(edit));

    res.status(SUCCESS).json(item);
  } else {
    res.status(401).json({ message: 'Token inválido' });
  }
});

app.delete('/crush/:id', async (req, res) => {
  const { authorization } = req.headers;
  const { id } = req.params;
  const dataCrush = await read();

  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
  if (valToken(authorization)) {
    delete dataCrush[+id - 1];

    res.status(SUCCESS).json({ message: 'Crush deletado com sucesso' });
  } else {
    res.status(401).json({ message: 'Token inválido' });
  }
});

app.listen(3000);
