const crypto = require('crypto');

const validateEmail = (e, reg = /\S+@\S+\.\S+/) => reg.test(e);

// https://stackoverflow.com/questions/8855687/secure-random-token-in-node-js
const token = crypto.randomBytes(8).toString('hex');

const getToken = (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  if (!email) {
    res.status(400).send({ message: 'O campo "email" é obrigatório' });
    return;
  }
  if (!validateEmail(email)) {
    res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
    return;
  }

  if (!password) {
    res.status(400).send({ message: 'O campo "password" é obrigatório' });
    return;
  }
  if (password.length < 6) {
    res.status(400).send({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
    return;
  }

  res.send({ token });
};

module.exports = { getToken };
