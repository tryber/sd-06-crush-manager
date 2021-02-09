const crypto = require('crypto');

const validateInfo = async (request, response) => {
  const { email, password } = request.body;

  const token = crypto.randomBytes(8).toString('hex');

  const validator = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const isValid = validator.test(String(email).toLowerCase());
  const six = 6;

  let message = 'oi';
  let status = 200;

  if (!email) {
    message = 'O campo "email" é obrigatório';
    status = 400;
  }
  if (email && !isValid) {
    message = 'O "email" deve ter o formato "email@email.com"';
    status = 400;
  }

  if (!password) {
    message = 'O campo "password" é obrigatório';
    status = 400;
  }
  if (password.length < six) {
    message = 'A "senha" deve ter pelo menos 6 caracteres';
    status = 400;
  }

  if (status === 200) {
    return response.status(status).send({ token });
  }
  return response.status(status).send({ message });
};

module.exports = validateInfo;
