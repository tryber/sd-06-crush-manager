const crypto = require('crypto');

function verifyEmail(email) {
  const emailRegex = /^([a-zA-Z0-9_-]+)@mail\.com$/gm;
  return emailRegex.test(email);
}
function verifypassword(password) {
  const passwordRegex = /^\d{6,12}$/gm;
  return passwordRegex.test(password);
}

const login = async (req, res) => {
  const { email, password } = req.body;
  const validateEmail = verifyEmail(email);
  const validatePassword = verifypassword(password);
  if (validateEmail && validatePassword) {
    const token = crypto.randomBytes(16).toString('hex');
    return res.status(200).json({ token });
  }
  if (email === '' || !email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!validateEmail) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (password.lenght < 6) {
    return res.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }
  if (password === '' || !password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
};

module.exports = { login };
