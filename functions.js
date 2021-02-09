const crypto = require('crypto');

const getNextId = (crushes) => {
  const arrayId = crushes.map((crush) => crush.id);
  const nextId = Math.max.apply(this, arrayId) + 1;

  return nextId;
};

const checkEmail = (email) => {
  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  return regex.test(email);
};

const checkDate = (date) => {
  const regex = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;
  return regex.test(date);
};

const checkPassword = (password) => {
  const passwordOk = password.toString().length >= 6;
  return passwordOk;
};

const createToken = () => {
  const token = crypto.randomBytes(8).toString('hex');
  return token;
};

const validateToken = (authorization) => {
  if (!authorization || authorization.toString() === '') {
    return 'Token não encontrado';
  }
  if (authorization.length !== 16) {
    return 'Token inválido';
  }
  return 'OK';
};

const validateLogin = (email, password) => {
  if (!email || email === '') {
    return 'O campo "email" é obrigatório';
  }
  if (!checkEmail(email)) {
    return 'O "email" deve ter o formato "email@email.com"';
  }
  if (!password || password.toString() === '') {
    return 'O campo "password" é obrigatório';
  }
  if (!checkPassword(password)) {
    return 'A "senha" deve ter pelo menos 6 caracteres';
  }
  return 'OK';
};

const validateCrush = (name, age, date) => {
  const { datedAt, rate } = date;
  if (!name || name === '') {
    return 'O campo "name" é obrigatório';
  }
  if (name.length < 3) {
    return 'O "name" deve ter pelo menos 3 caracteres';
  }
  if (!age || age.toString() === '') {
    return 'O campo "age" é obrigatório';
  }
  if (age < 18) {
    return 'O crush deve ser maior de idade';
  }
  if (!date || !datedAt || !rate || datedAt.toString() === '' || rate.toString() === '') {
    return 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios';
  }
  if (!checkDate(datedAt)) {
    return 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"';
  }
  if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
    return 'O campo "rate" deve ser um inteiro de 1 à 5';
  }
  return 'OK';
};

module.exports = {
  createToken,
  validateLogin,
  validateToken,
  validateCrush,
  getNextId,
};
