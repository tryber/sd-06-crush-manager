const crypto = require('crypto');

const validateInfo = async (request, response) => {
  const { email, password } = request.body;

  const token = crypto.randomBytes(8).toString('hex');

  const validator = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const isValid = validator.test(String(email).toLowerCase());
  const six = 6;

  let message = '';
  const FAIL = 400;
  const SUCCESS = 200;

  if (!email) {
    message = 'O campo "email" é obrigatório';
    return response.status(FAIL).send({ message });
  }
  if (!password) {
    message = 'O campo "password" é obrigatório';
    return response.status(FAIL).send({ message });
  }
  if (!isValid) {
    message = 'O "email" deve ter o formato "email@email.com"';
    return response.status(FAIL).send({ message });
  }

  if (password.length < six) {
    message = 'A "senha" deve ter pelo menos 6 caracteres';
    return response.status(FAIL).send({ message });
  }

  return response.status(SUCCESS).send({ token });
};

module.exports = validateInfo;
