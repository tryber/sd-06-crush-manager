const crypto = require('crypto');

const SUCCESS = 200;
const ERROR = 400;

const loginControl = (request, response, next) => {
  const { email, password } = request.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email.length < 1) {
    response.status(ERROR).json({ message: 'O campo "email" é obrigatório' });
  } else if (!emailRegex.test(email) && email.length > 1) {
    response.status(ERROR).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  } else if (password < 111111 && password !== '') {
    response.status(ERROR).json({
      message: 'O "password" ter pelo menos 6 caracteres',
    });
  } else if (password === '') {
    response.status(ERROR).json({
      message: 'O campo "password" é obrigatório',
    });
  }

  const token = crypto.randomBytes(8).toString('hex');
  const generatedToken = { token };

  response.status(SUCCESS).json(generatedToken);
  next();
};

module.exports = loginControl;
