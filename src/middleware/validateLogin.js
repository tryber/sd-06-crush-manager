const crypto = require('crypto');
const { emailValidation, passwordValidation } = require('../utils/validator');

const validateLogin = (req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  const { email, password } = req.body;
  if (!email || email === '') {
    return res.status(400).json({
      message: 'O campo "email" é obrigatório',
    });
  }
  if (!password || password === '') {
    return res.status(400).json({
      message: 'O campo "password" é obrigatório',
    });
  }
  if (emailValidation(email)) {
    return res.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }
  if (passwordValidation(password)) {
    return res.status(400).json({
      message: 'A "senha" deve ter pelo menos 6 caracteres',
    });
  }
  return res.status(200).json({ token });
};

module.exports = validateLogin;
