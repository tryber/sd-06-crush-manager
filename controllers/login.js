const {
  createToken,
  validateEmail,
  validatePassword,
} = require('./login_aux');

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (email && !validateEmail(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  
  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (password && !validatePassword(password)) {
    return res.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }

  return res.status(200).json({ token: createToken() });
};

module.exports = login;
