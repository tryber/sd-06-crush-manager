const crypto = require('crypto');
const { ErrorHandler } = require('./errorHandling/helpers');

const tokenGenerator = () => crypto.randomBytes(8).toString('hex');

const validateEmail = (email) => {
  const regexValidator = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.?([a-z]+)?$/i;
  return regexValidator.test(email);
};

const emailValidator = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email || email.length === 0) {
      throw new ErrorHandler(400, 'O campo "email" é obrigatório');
    } else if (!validateEmail(email)) {
      throw new ErrorHandler(400, 'O "email" deve ter o formato "email@email.com"');
    }
    next();
  } catch (error) {
    next(error);
  }
};

const validatePassword = (password) => {
  const regexValidator = /\d{6,}/;
  return regexValidator.test(password);
};

const passwordValidator = async (req, res, next) => {
  const { password } = req.body;
  try {
    if (!password || password.length === 0) {
      throw new ErrorHandler(400, 'O campo "password" é obrigatório');
    } else if (!validatePassword(password)) {
      throw new ErrorHandler(400, 'A "senha" deve ter pelo menos 6 caracteres');
    }
    next();
  } catch (error) {
    next(error);
  }
};

const login = (req, res) => {
  const token = tokenGenerator();
  res.status(200).json({
    token,
  });
};

module.exports = { login, emailValidator, passwordValidator };
