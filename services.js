const crypto = require('crypto');

const tokenGenerator = () => crypto.randomBytes(8).toString('hex');

const validateEmail = (email) => {
  const pattern = /\S+@\S+\.\S+/;
  return pattern.test(email);
};

const validatePassword = (password) => {
  const pattern = /^.{6,}$/;
  return pattern.test(password);
};

const checkToken = (req, res, next) => {
  !req.headers.authorization ? res.status(401).json({ message: 'Token não encontrado' }) : null;
  req.headers.authorization.length !== 16 ? res.status(401).json({ message: 'Token inválido' }) : null;
  next();
};

module.exports = {
  tokenGenerator,
  validateEmail,
  validatePassword,
  checkToken,
};
