const crypto = require('crypto');

function generateToken() {
  const token = crypto.randomBytes(8).toString('hex');

  return token;
}

function checkIfExists(field) {
  if (!field || field === '') return false;

  return true;
}

function checkLength(field, length) {
  if (field.toString().length < length) return false;

  return true;
}

function validateEmail(email) {
  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

  return !regex.test(email);
}

function verifyToken(token) {
  const regex = /^[a-zA-Z0-9]*$/i;

  if (token.length !== 16 || !regex.test(token)) {
    return false;
  }

  return true;
}

function checkDate(date) {
  const regex = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;

  return regex.test(date);
}

const getNextId = (data) => {
  const arrayId = data.map((crush) => crush.id);
  const nextId = Math.max.apply(this, arrayId) + 1;
  return nextId;
};

function validateToken(token) {
  if (!checkIfExists(token)) return 'Token não encontrado';
  if (!verifyToken(token)) return 'Token inválido';

  return true;
}

function validateName(name) {
  if (!checkIfExists(name)) return 'O campo "name" é obrigatório';
  if (!checkLength(name, 3)) return 'O "name" deve ter pelo menos 3 caracteres';

  return true;
}

function validateAge(age) {
  if (!checkIfExists(age)) return 'O campo "age" é obrigatório';
  if (age < 18) return 'O crush deve ser maior de idade';

  return true;
}

function validateDate(date, datedAt, rate) {
  if (!checkIfExists(date) || !checkIfExists(datedAt) || !checkIfExists(rate)) return 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios';
  if (!checkDate(datedAt)) return 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"';
  if (rate < 1 || rate > 5 || !Number.isInteger(rate)) return 'O campo "rate" deve ser um inteiro de 1 à 5';

  return true;
}

module.exports = {
  generateToken,
  checkIfExists,
  checkLength,
  validateEmail,
  getNextId,
  validateDate,
  validateToken,
  validateName,
  validateAge,
};
