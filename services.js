const fs = require('fs');

const crushData = 'crush.json';

const readCrush = () => {
  const file = JSON.parse(fs.readFileSync(crushData, 'utf8'));
  return file;
};

const formatEmail = (email) => {
  const expectedFormat = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/;
  return expectedFormat.test(email);
};

const authToken = (req, res, next) => {
  const token = { token: '7JSp886CGr' };
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorization !== token) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

const formatDate = (date) => {
  const expectedFormat = /(\d{2})[/](\d{2})[/](\d{4})/;
  return expectedFormat.test(date);
};

const verifyCrush = (name, age, date) => {
  if (!name) {
    return { message: 'O campo "name" é obrigatório' };
  }
  if (name.length < 3) {
    return { message: 'O "name" deve ter pelo menos 3 caracteres' };
  }
  if (!age) {
    return { message: 'O campo "age" é obrigatório' };
  }
  if (age < 18) {
    return { message: 'O crush deve ser maior de idade' };
  }
  if (!date || !date.datedAt || (!date.rate && date.rate !== 0)) {
    return { message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' };
  }
  if (!formatDate(date.datedAt)) {
    return { message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' };
  }
  if (date.rate % 1 !== 0 || date.rate < 1 || date.rate > 5) {
    return { message: 'O campo "rate" deve ser um inteiro de 1 à 5' };
  }
  return true;
};

module.exports = {
  readCrush,
  formatEmail,
  authToken,
  formatDate,
  verifyCrush,
};
