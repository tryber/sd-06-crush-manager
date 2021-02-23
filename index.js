const express = require('express');
const fs = require('fs');
const crushes = require('./crush.json');
// const crushRoutes = require('./routes/crushRoutes');

const app = express();
const SUCCESS = 200;
const NOTFOUND = 404;
const PORT = 3000;

app.use(express.json());
// app.use(crushRoutes);

const getArrayOfCrushes = () => {
  const crushesContent = fs.readFileSync('./crush.json', 'utf8');
  return JSON.parse(crushesContent);
};

const writeInFile = (crush) => {
  fs.writeFileSync('./crush.json', crush, 'utf-8');
  return true;
};

const crushById = (id, response) => {
  function compareCrushIdWithParams(crush) {
    if (crush.id === parseInt(id, 10)) {
      return response.status(SUCCESS).send(crush);
    }
  }
  crushes.map(compareCrushIdWithParams);
};

const responseError = (errorCode, message, response) => {
  response.status(errorCode).send({ message });
};

const buildToken = () => {
  // Metodo aprendido a partir desse link: https://qastack.com.br/programming/1349404/generate-random-string-characters-in-javascript
  const tokenComponent = Math.random().toString(36).substring(2, 10);
  const token = tokenComponent + tokenComponent;

  return token;
};

const verifyEmail = (email, response) => {
  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  const isValidEmail = regex.test(email);

  if (!email) {
    return response.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!isValidEmail) {
    return response.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
};

const verifyPassword = (password, response) => {
  const six = 6;

  if (!password) {
    return response.status(400).json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length < six) {
    return response.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }
};

const tokenExists = (authorization, response) => {
  const authorizationNotExists = !authorization || authorization === '';
  if (authorizationNotExists) {
    return responseError(401, 'Token não encontrado', response);
  }
};

const validToken = (authorization, response) => {
  const tokenLength = authorization.length;
  const validLength = 16;
  if (tokenLength !== validLength) {
    return responseError(401, 'Token inválido', response);
  }
};

const nameExists = (name, response) => {
  const nameNotExists = !name || name === '';
  if (nameNotExists) {
    return responseError(400, 'O campo "name" é obrigatório', response);
  }
};

const nameLength = (name, response) => {
  const nameSize = name.length;
  const minCaracteres = 3;
  if (nameSize < minCaracteres) {
    return responseError(400, 'O "name" deve ter pelo menos 3 caracteres', response);
  }
};

const ageExists = (age, response) => {
  const ageNotExists = !age || age === '';
  if (ageNotExists) {
    return responseError(400, 'O campo "age" é obrigatório', response);
  }
};

const allowedAge = (age, response) => {
  const permittedAge = 18;
  if (age < permittedAge) {
    return responseError(400, 'O crush deve ser maior de idade', response);
  }
};

const dateIsRequired = (date, response) => {
  const dateNotExists = !date || !date.datedAt || (!date.rate && date.rate !== 0);
  if (dateNotExists) {
    return responseError(400, 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios', response);
  }
};

const dateRateWithinRange = (rate, response) => {
  const rateOutRange = !Number.isInteger(rate) || rate < 1 || rate > 5;
  if (rateOutRange) {
    return responseError(400, 'O campo "rate" deve ser um inteiro de 1 à 5', response);
  }
};

const formatDatedAt = (datedAt, response) => {
  // Regex pesquisado a partir de: https://stackoverflow.com/questions/15491894/regex-to-validate-date-format-dd-mm-yyyy;
  const regexDateFormat = /^(?:(?:31(\/)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
  const incorrectFormatDate = !regexDateFormat.test(datedAt);
  if (incorrectFormatDate) {
    return responseError(400, 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"', response);
  }
};

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

// get all crushes
app.get('/crush', (_request, response) => {
  response.status(SUCCESS).send(getArrayOfCrushes());
});

// get crush by id
app.get('/crush/:id', (request, response) => {
  const { id } = request.params;
  crushById(id, response);
  responseError(NOTFOUND, 'Crush não encontrado', response);
});

// send requisition to receive token
app.post('/login', (request, response) => {
  const { email, password } = request.body;
  const token = buildToken();
  // console.log(password.length);

  verifyEmail(email, response);
  verifyPassword(password, response);

  response.status(200).json({ token });
});

app.post('/crush', (request, response) => {
  const { authorization } = request.headers;
  const { name, age, date } = request.body;
  console.log(authorization);

  tokenExists(authorization, response);
  validToken(authorization, response);

  nameExists(name, response);
  nameLength(name, response);

  ageExists(age, response);
  allowedAge(age, response);

  dateIsRequired(date, response);
  dateRateWithinRange(date.rate, response);
  formatDatedAt(date.datedAt, response);

  const allCrushes = getArrayOfCrushes();
  const createdCrush = { id: allCrushes.length + 1, name, age, date };
  writeInFile(JSON.stringify([...allCrushes, createdCrush], 0, 2));
  return response.status(201).send(createdCrush);
});

app.listen(PORT, console.log(`Server is running on port ${PORT}`));
