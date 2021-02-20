const crypto = require('crypto');

const token = () => (crypto.randomBytes(8).toString('hex'));

function middlewareLogin(request, response, next) {
  if (!request.body.password || request.body.password === '') {
    response.status(400).send({ message: 'O campo "password" é obrigatório' });
  }
  if (!request.body.email || request.body.email === '') {
    response.status(400).send({ message: 'O campo "email" é obrigatório' });
  }

  const { email, password } = request.body;
  const regexEmail = /^([\w.-]+)@([\w-]+)((\.(\w){2,3})+)$/;

  if (!regexEmail.test(email)) {
    response.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (String(password).length < 6) {
    response.status(400).send({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }

  request.token = token();
  next();
}

module.exports = middlewareLogin;
