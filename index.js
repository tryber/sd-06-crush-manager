const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises; // why "promises"!?
// const path = require('path');
const crypto = require('crypto');
// const router = express.Router();

const app = express();
const SUCCESS = 200;
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// MIDDLEWARES -------------------------------------------------------

// const getRead = async (fileName) => {
const getRead = async () => {
  const file = await fs.readFile('./crush.json', 'utf-8', (err, data) => {
  // const file = await fs.readFile(path.resolve(__dirname, `${fileName}.json`), '(err, data) => {
    if (err) {
      return err;
    }
    return data;
  });
  return file;
};

const getWrite = async (data) => {
// await fs.writeFile(path.resolve(__dirname, `${fileName}.json`), data, 'utf-8', (err) => {
  await fs.writeFile('./crush.json', data, 'utf-8', (err) => {
    if (err) return console.log(err);
  });
  return true;
};

const verifyEmail = (email) => {
  const regex = /^[^@]+@[^@]+\.[^@]+$/;
  return regex.test(String(email).toLowerCase());
};

const verifyPassword = (password) => {
  if (password.length > 5) {
    return true;
  }
  return false;
};

const verifyDate = (date) => {
  const regex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
  return regex.test(date);
};

// const token = crypto.randomBytes(8).toString('hex');

// -----------------------------------------------------------------------------

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
  // response.send('running');
});

// - 01 - npm test tests/getAllCrushs.test.js
app.get('/crush', async (request, response) => {
  // const allCrushs = await getRead('crush');
  const allCrushs = await getRead();
  // console.log(allCrushs);
  try {
    response.status(200).json(JSON.parse(allCrushs));
  } catch (err) {
    response.status(200).json([]);
  }
});

// - 02 - npm test tests/getCrushById.test.js
app.get('/crush/:id', async (request, response) => {
  const { id } = request.params;
  // const { id } = parseInt(request.params, 10);
  // const allCrushs = await getRead('crush');
  const allCrushs = await getRead();
  const crushById = JSON.parse(allCrushs).find((crushId) => crushId.id === parseInt(id, 10));
  // console.log(allCrushs);
  // console.log(crushById);
  // try {
  //   response.status(200).json(crushById);
  //   // response.status(200).json(JSON.stringify(crushById));
  // } catch (err) {
  //   response.status(404).json({ message: 'Crush não encontrado' });
  // }
  if (!crushById) {
    return response.status(404).json({ message: 'Crush não encontrado' });
  }
  return response.status(200).json(crushById);
});

// - 03 - npm test tests/login.test.js
app.post('/login', async (request, response) => {
  const token = await crypto.randomBytes(8).toString('hex');
  const { email, password } = request.body;

  if (!email) {
    return response.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!verifyEmail(email)) {
    return response.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    return response.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (!verifyPassword(password)) {
    return response.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }
  return response.status(200).json({ token });
});

// - 04 - npm test tests/createCrush.test.js
app.post('/crush', async (request, response) => {
  const allCrushs = await getRead();
  const tokenHeader = request.headers.authorization;
  const allCrushsJson = JSON.parse(allCrushs);
  const { name, age, date } = request.body;
  // const regex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;

  if (!tokenHeader) {
    return response.status(401).json({ message: 'Token não encontrado' });
  }
  if (tokenHeader.length !== 16) {
    return response.status(401).json({ message: 'Token inválido' });
  }

  if (!name || name === '') {
    return response.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return response.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  if (!age || age === '') {
    return response.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return response.status(400).json({ message: 'O crush deve ser maior de idade' });
  }

  // if (!date || !date.datedAt || date.rate === undefined) {
  // if (date === undefinied || !date || !date.datedAt || date.rate === undefined) {
  if (!date || !date.datedAt || !date.rate || date === ''
    || date.datedAt === '' || date.rate === '') {
    return response
      .status(400)
      .json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  }
  if (date.rate < 1 || date.rate > 5) {
    return response.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  if (verifyDate(date.datedAt) === false) {
    return response.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  const newCrush = { id: allCrushsJson.length + 1, ...request.body };
  allCrushsJson.push(newCrush);
  // await getWrite(JSON.stringify(allCrushsJson));
  const crushJson = JSON.stringify(allCrushsJson);
  // await fs.writeFile('crush.json', crushJson);
  await getWrite(crushJson);
  return response.status(201).json(newCrush);
});

// - 05 - npm test tests/editCrush.test.js
app.put('/crush/:id', async (request, response) => {
  const allCrushs = await fs.readFile('crush.json');
  const { name, age, date } = request.body;
  const tokenHeader = request.headers.authorization;
  // const regex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;

  if (!tokenHeader) {
    return response.status(401).json({ message: 'Token não encontrado' });
  }
  if (tokenHeader.length !== 16) {
    return response.status(401).json({ message: 'Token inválido' });
  }

  if (!name || name === '') {
    return response.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return response.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  if (!age || age === '') {
    return response.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return response.status(400).json({ message: 'O crush deve ser maior de idade' });
  }

  if (!date || !date.datedAt || !date.rate || date === ''
    || date.datedAt === '' || date.rate === '') {
    return response
      .status(400)
      .json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  }
  if (date.rate < 1 || date.rate > 5) {
    return response.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  if (verifyDate(date.datedAt) === false) {
    return response.status(400)
    .json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  // const allCrushs = await fs.readFile('crush.json');
  const allCrushsJson = JSON.parse(allCrushs);
  const crushById = parseInt(request.params.id, 10);
  const crushFound = allCrushsJson.find((crush) => crush.id !== crushById);
  const newCrush = ({ name, age, id: crushById, date });
  crushFound.push(newCrush);

  await getWrite(JSON.stringify(crushFound));

  response.status(200).send(newCrush);
});

// app.delete('/crush/:id', async (request, response) => {});
// app.get('/crush/search?q=searchTerm', async (request, response) => {});

// app.listen(3000);
app.listen(3000, () => console.log('running'));

// referencia 
// Apoio de Andersson Stuber e Paulo Lins
// YOUTUBE = "tantaum" de videos(maioria ROCKETSEAT)
// npm install
// npm i express
// npm i body-parser
// npm i nodemon
// npm i fs

// npm i mongoose
// npm i jsonwebtoken

// https://www.youtube.com/watch?v=BN_8bCfVp88&feature=youtu.be
// https://www.youtube.com/watch?v=BapA-vG9HZI
// https://www.youtube.com/watch?v=j95Lwxvi9JY
// https://www.youtube.com/watch?v=DiXbJL3iWVs&t=663s
// https://stackoverflow.com/questions/31649267/how-to-kill-a-nodejs-process-in-linux
// https://stackoverflow.com/questions/2496710/writing-files-in-node-js
// https://nodejs.org/en/knowledge/file-system/how-to-write-files-in-nodejs/
// https://stackabuse.com/reading-and-writing-json-files-with-node-js/
// https://www.regexplanet.com/
// https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
// https://stackoverflow.com/questions/39110801/path-join-vs-path-resolve-with-dirname
// https://www.digitalocean.com/community/tutorials/js-json-parse-stringify-pt
// https://stackoverflow.com/questions/51150956/how-to-fix-this-error-typeerror-err-invalid-callback-callback-must-be-a-funct/51151244
// https://www.geeksforgeeks.org/node-js-crypto-randombytes-method/
// https://stackoverflow.com/questions/15491894/regex-to-validate-date-format-dd-mm-yyyy/15491967
