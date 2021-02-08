const { tokenGenerator, validateEmail, validatePassword } = require('../services');

const login = (_req, res) => {
  const { email, password } = _req.body;

  if (!email) return res.status(400).json({ message: 'O campo email é obrigatório' });
  if (!validateEmail(email)) return res.status(400).json({ message: 'O email deve ter o formato "email@email.com"' });

  if (!password) return res.status(400).json({ message: 'O campo password é obrigatório' });
  if (!validatePassword(password)) return res.status(400).json({ message: 'O password ter pelo menos 6 caracteres' });

  res.status(200).json({ token: tokenGenerator() });
};

module.exports = { login };
