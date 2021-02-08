const crypto = require('crypto');

const badRequest = 400;

module.exports = (req, res, next) => {
  const { email, password } = req.body;

  // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const emptyEmail = (!email || email === '');
  const validEmail = (email) && reg.test(String(email).toLowerCase());
  const emptyPassword = (!password || password.length === 0);
  const validPassword = (password && password.length >= 6);

  if (emptyEmail) return res.status(badRequest).send({ message: 'O campo "email" é obrigatório' });
  if (!emptyEmail && !validEmail) return res.status(badRequest).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  if (emptyPassword) return res.status(badRequest).send({ message: 'O campo "password" é obrigatório' });
  if (!emptyPassword && !validPassword) return res.status(badRequest).send({ message: 'A "senha" deve ter pelo menos 6 caracteres' });

  const token = crypto.randomBytes(8).toString('hex');

  req.body = { token };
  next();
};
