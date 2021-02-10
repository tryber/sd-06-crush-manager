const crypto = require('crypto');

const generateLoginToken = (request, response) => {
  const token = crypto.randomBytes(8).toString('hex');

  const { email, password } = request.body;

  const regexToValidEmail = /^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

  const validateEmail = (userEmail) => regexToValidEmail.test(userEmail);

  const validatePassword = (userPassword) => (userPassword.length > 5);

  if (!email) {
    return response.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!validateEmail(email)) {
    return response.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  if (!password) {
    return response.status(400).json({ message: 'O campo "password" é obrigatório' });
  }

  if (!validatePassword(password)) {
    return response.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }

  return response.status(200).json({ token });
};

module.exports = {
  generateLoginToken,
};
