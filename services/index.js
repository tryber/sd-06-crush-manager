const fs = require('fs').promises;
const crypto = require('crypto');

const getCrushes = async () => {
  const crushList = await fs.readFile('./crush.json');
  return JSON.parse(crushList);
};

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
  if (!req.headers.authorization) return res.status(401).json({ message: 'Token não encontrado' });
  if (req.headers.authorization.length !== 16) return res.status(401).json({ message: 'Token inválido' });

  return next();
};

module.exports = {
  getCrushes,
  tokenGenerator,
  validateEmail,
  validatePassword,
  checkToken,
};
