const fs = require('fs');
const crypto = require('crypto');

const pegandoCrushs = async () => {
  const listaDeCrush = await fs.readFileSync('./crush.json', 'utf8', (err, data) => {
    console.log('chegando aqui');
    if (err) throw new Error(err);
    return data;
  });
  const crushs = JSON.parse(listaDeCrush);
  return crushs;
};

const gerandoToken = () => crypto.randomBytes(8).toString('hex');

const validandoEmail = (email) => {
  const validacao = /\S+@\S+\.\S+/;
  return validacao.test(email);
};

const validandoPassword = (password) => {
  const validacao = /^.{6,}$/;
  return validacao.test(password);
};

const checandoToken = (req, res, next) => {
  if (!req.headers.authorization) return res.status(401).json({ message: 'Token não encontrado' });
  if (req.headers.authorization.length !== 16) return res.status(401).json({ message: 'Token inválido' });

  return next();
};

module.exports = {
  checandoToken,
  validandoPassword,
  gerandoToken,
  validandoEmail,
  pegandoCrushs,
};
