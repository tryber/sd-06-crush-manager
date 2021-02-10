const crypto = require('crypto');

const SUCCESS = 200;
const ERROR = 400;

const loginControl = (request, response, _next) => {
  const { email, password } = request.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    return response.status(ERROR).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!emailRegex.test(email) && email.length > 1) {
    return response.status(ERROR).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }

  if (!password) {
    return response.status(ERROR).json({
      message: 'O campo "password" é obrigatório',
    });
  }

  if (password) {
    if (password.length < 6) {
      return response.status(ERROR).json({
        message: 'A "senha" deve ter pelo menos 6 caracteres',
      });
    }
  }

  const token = crypto.randomBytes(8).toString('hex');
  const generatedToken = { token };

  return response.status(SUCCESS).json(generatedToken);
};

module.exports = loginControl;
