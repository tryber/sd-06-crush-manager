const fs = require('fs');
const crypto = require('crypto');

const getCrushes = async () => {
  const crushList = await fs.readFileSync('./crush.json', 'utf-8', (err) => {
    if (err) throw new Error(err);
    console.log('File read');
  });
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
  if (!req.headers.token) return res.status(401).json({ message: 'Token não encontrado' });
  if (req.headers.token.length !== 16) return res.status(401).json({ message: 'Token inválido' });

  return next();
};

module.exports = {
  getCrushes,
  tokenGenerator,
  validateEmail,
  validatePassword,
  checkToken,
};
