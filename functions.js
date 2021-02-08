const crypto = require('crypto');

const checkEmail = (email) => {
  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  return regex.test(email);
};

const checkPassword = (password) => {
  const passwordOk = password.toString().length >= 6;
  return passwordOk;
};

const createToken = () => {
  const token = crypto.randomBytes(8).toString('hex');
  return token;
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

module.exports = {
  createToken,
  validateLogin,
};
