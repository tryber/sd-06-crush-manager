const express = require('express');
const fs = require('fs');

const app = express();
const SUCCESS = 200;

const auth = { authorization: '7mqaVRXJSp886CGr' };

app.use(express.json());

function validatePassword(password) {
  return password.toLowerCase().toString();
}

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validateDate(date) {
  const dateRegex = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
  return dateRegex.test(date);
}

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

// Req1 -*-*-*-*-*--**-*--*-*-*-*-*-*-*-*-*-*-*-*-*

app.get('/crush', (req, res) => {
  const content = fs.readFileSync('./crush.json', 'utf-8');
  if (!content) {
    return res.status(200).json([]);
  }
  return res.status(200).json(JSON.parse(content));
});

// Req2 -*-*-*-*-*--**-*--*-*-*-*-*-*-*-*-*-*-*-*-*

app.get('/crush/:id', (req, res) => {
  const content = fs.readFileSync('./crush.json', 'utf-8');
  const { id } = req.params;
  const filteredCrushes = JSON.parse(content).find((crush) => crush.id === Number(id));
  if (!filteredCrushes) {
    return res.status(404).json({ message: 'Crush não encontrado' });
  }
  return res.status(200).json(filteredCrushes);
});

// Req3 -*-*-*-*-*--**-*--*-*-*-*-*-*-*-*-*-*-*-*-*

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || email === '') {
    return res.status(400).json(
      {
        message: 'O campo "email" é obrigatório',
      },
    );
  }

  if (!validateEmail(email)) {
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
      token: auth.authorization,
    },
  );
});

// Req4 -*-*-*-*-*-*-*-*-*-*-*-*-*--*-*-*-*-*-*-*

app.post('/crush', (req, res) => {
  const { authorization } = req.headers;
  const addToArray = 1;

  const crushArray = JSON.parse(fs.readFileSync('./crush.json'));
  const newCrushId = crushArray.length + addToArray;
  const addedCrush = { ...req.body, id: newCrushId };
  const { name, age, date } = addedCrush;

  if (authorization === undefined || !authorization || authorization === '') {
    return res.status(401).json(
      {
        message: 'Token não encontrado',
      },
    );
  }

  if (authorization.length !== 16) {
    return res.status(401).json(
      {
        message: 'Token inválido',
      },
    );
  }

  if (name === '' || !name) {
    return res.status(400).json(
      {
        message: 'O campo "name" é obrigatório',
      },
    );
  }

  if (name.length < 3) {
    return res.status(400).json(
      {
        message: 'O "name" deve ter pelo menos 3 caracteres',
      },
    );
  }

  if (age === '' || !age) {
    return res.status(400).json(
      {
        message: 'O campo "age" é obrigatório',
      },
    );
  }

  if (age < 18) {
    return res.status(400).json(
      {
        message: 'O crush deve ser maior de idade',
      },
    );
  }

  if (!date || date.datedAt === '' || date.datedAt === undefined || date.rate === '' || date.rate === undefined) {
    return res.status(400).json(
      {
        message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
      },
    );
  }

  if (!validateDate(date.datedAt)) {
    return res.status(400).json(
      {
        message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"',
      },
    );
  }

  if (date.rate < 1 || date.rate > 5) {
    return res.status(400).json(
      {
        message: 'O campo "rate" deve ser um inteiro de 1 à 5',
      },
    );
  }

  crushArray.push(addedCrush);
  fs.writeFileSync('crush.json', JSON.stringify(crushArray));
  return res.status(201).json(addedCrush);
});

// Req5 -*-*-*-*-*-*-*-*-*-*-*-*-*--*-*-*-*-*-*-*

app.put('/crush/:id', (req, res) => {
  const { authorization } = req.headers;
  const { id } = req.params;
  const { name, age, date } = req.body;

  const crushArray = JSON.parse(fs.readFileSync('./crush.json'));
  const editedCrush = { name, age, date, id: Number(id) };

  if (authorization === undefined || !authorization || authorization === '') {
    return res.status(401).json(
      {
        message: 'Token não encontrado',
      },
    );
  }

  if (authorization.length !== 16) {
    return res.status(401).json(
      {
        message: 'Token inválido',
      },
    );
  }

  if (name === '' || !name) {
    return res.status(400).json(
      {
        message: 'O campo "name" é obrigatório',
      },
    );
  }

  if (name.length < 3) {
    return res.status(400).json(
      {
        message: 'O "name" deve ter pelo menos 3 caracteres',
      },
    );
  }

  if (age === '' || !age) {
    return res.status(400).json(
      {
        message: 'O campo "age" é obrigatório',
      },
    );
  }

  if (age < 18) {
    return res.status(400).json(
      {
        message: 'O crush deve ser maior de idade',
      },
    );
  }

  if (!date || date.datedAt === '' || date.datedAt === undefined || date.rate === '' || date.rate === undefined) {
    return res.status(400).json(
      {
        message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
      },
    );
  }

  if (!validateDate(date.datedAt)) {
    return res.status(400).json(
      {
        message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"',
      },
    );
  }

  if (date.rate < 1 || date.rate > 5) {
    return res.status(400).json(
      {
        message: 'O campo "rate" deve ser um inteiro de 1 à 5',
      },
    );
  }

  const newCrushArray = crushArray.map((newCrush) => {
    if (newCrush.id === editedCrush.id) {
      return editedCrush;
    }
    return newCrush;
  });

  fs.writeFileSync('crush.json', JSON.stringify(newCrushArray));
  return res.status(200).json(editedCrush);
});

// Req6 -*-*-*-*-*-*-*-*-*-*-*-*-*--*-*-*-*-*-*-*

app.delete('/crush/:id', (req, res) => {
  const { id } = req.params;
  const { authorization } = req.headers;

  const crushArray = JSON.parse(fs.readFileSync('./crush.json'));

  if (!authorization || authorization === '' || authorization === undefined) {
    return res.status(401).json(
      {
        message: 'Token não encontrado',
      },
    );
  }

  if (authorization.length !== 16) {
    return res.status(401).json(
      {
        message: 'Token inválido',
      },
    );
  }

  const filteredCrushArray = crushArray.find((crush) => crush.id !== Number(id));
  fs.writeFileSync('crush.json', JSON.stringify(filteredCrushArray));
  return res.status(200).json(
    {
      message: 'Crush deletado com sucesso',
    },
  );
});

app.listen(3000, () => console.log('ouvindo na porta 3000'));
