const crypto = require('crypto');

const validateUser = async (req, res) => {
  const { email, password } = req.body;
  const authentication = crypto({ length: 16, type: 'hex' });
  const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/;

  if (!email) {
    return res
      .status(400)
      .json({ message: 'O campo "email" é obrigatório' });
  }
  if (!emailRegex.test(email.toLowerCase())) {
    return res
      .status(400)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    return res
      .status(400)
      .json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.toString().length < 6) {
    return res
      .status(400)
      .json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }

  res.status(200).json({ token: authentication });
};

module.exports = validateUser;
