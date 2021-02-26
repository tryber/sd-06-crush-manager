const geraToken = require('../utils/generateToken');

const login = (req, res) => {
  const { email, password } = req.body;
  const emailMask = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

  if (email === '' || !email) {
    return res
      .status(400)
      .json({ message: 'O campo "email" é obrigatório' });
  }

  if (emailMask.test(email) === false) {
    return res
      .status(400)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  if (password === '' || !password) {
    return res
      .status(400)
      .json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }

  const token = geraToken();
  res
    .status(200)
    .json({ token });
};

module.exports = login;
