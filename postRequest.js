const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const crypto = require('crypto');
const { validateEmail, validatePassword, validateToken } = require('./utils/validateUsers');
const { validateCrushName } = require('./utils/validateCrush');
const { parsedData } = require('./utils/readCrushData');
const { modifyFile } = require('./utils/writeCrushData');

app.use(bodyParser.json());

async function handleLogin(request, response) {
  const { email, password } = request.body;
  const emailIsValid = validateEmail(email);
  const passwordIsValid = validatePassword(password);
  if (emailIsValid && passwordIsValid) {
    const token = crypto.randomBytes(8).toString('hex');
    response.status(200).json({ token });
  }
  if (emailIsValid === undefined) return response.status(400).send({ message: 'O campo "email" é obrigatório' });
  if (!emailIsValid) return response.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  if (passwordIsValid === undefined) return response.status(400).send({ message: 'O campo "password" é obrigatório' });
  if (!passwordIsValid) return response.status(400).send({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
}

async function handleLoginValidation(request, response, next) {
  const readToken = request.headers.authorization;
  const tokenIsValid = validateToken(readToken);
  if (tokenIsValid === undefined) return response.status(401).send({ message: 'Token não encontrado' });
  if (!tokenIsValid) return response.status(401).send({ message: 'Token inválido' });
  return next();
}

async function handleCrushValidation(request, response, next) {
  const { name, age, date } = request.body;
  const nameIsValid = validateCrushName(name);
  if (nameIsValid === undefined) return response.status(400).send({ message: 'O campo "name" é obrigatório' });
  if (!nameIsValid) return response.status(400).send({ message: 'O "name" deve ter pelo menos 3 caracteres' });

  const minAge = 18;
  if (!age || typeof age !== 'number') return response.status(400).send({ message: 'O campo "age" é obrigatório' });
  if (age < minAge) return response.status(400).send({ message: 'O crush deve ser maior de idade' });

  const rateFormat = /^[1-5]$/gm;
  const dateFormat = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;

  if (date === undefined || date.datedAt === undefined || date.rate === undefined) return response.status(400).send({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  if (!rateFormat.test(date.rate)) return response.status(400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  if (!dateFormat.test(date.datedAt)) return response.status(400).send({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });

  next();
}

async function addCrush(request, response) {
  const { name, age, date } = request.body;
  const data = await parsedData();
  const id = data.length + 1;
  const crushAdded = { name, age, id, date };
  const newCrushArray = data.concat({ name, age, id, date });
  modifyFile(newCrushArray);
  response.status(201).json(crushAdded);
}

module.exports = {
  handleLogin,
  addCrush,
  handleLoginValidation,
  handleCrushValidation,
};
