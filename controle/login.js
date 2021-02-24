const { gerandoToken, validandoEmail, validandoPassword } = require('../servicos');

const login = (req, res) => {
  const { email, password } = req.body;
  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!validandoEmail(email)) return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (!validandoPassword(password)) return res.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  res.status(200).json({ token: gerandoToken() });
};

module.exports = { login };
