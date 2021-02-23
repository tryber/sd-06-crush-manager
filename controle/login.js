const { gerandoToken, validandoEmail, validandoPassword } = require('../servicos');

const login = (_req, res) => {
  const { email, password } = _req.body;

  if (!email) return res.status(400).json({ message: 'O campo email é obrigatorio' });
  if (!validandoEmail) return res.status(400).json({ message: 'O email deve ter o formato "email@email.com"' });

  if (!password) return res.status(400).json({ message: 'O campo password é obrigatorio' });
  if (!validandoPassword) return res.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });

  res.status(200).json({ token: gerandoToken() });
};

module.exports = { login };
