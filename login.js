const login = async (req, res) => {
  const { email = 0, password = 0 } = req.body;
  const regexEmail = /^[^\s@;*&%^="!?#+]+@[^\s@;*&%^="!?#+]+\.[^\s@;*&%^="!?#+]+$/;
  const validationEmail = regexEmail.test(email);
  const validationPassword = password.length >= 6;

  if (!email) return res.status(400).send({ message: 'O campo "email" é obrigatório' });
  if (!password) return res.status(400).send({ message: 'O campo "password" é obrigatório' });
  if (!validationEmail) return res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  if (!validationPassword) return res.status(400).send({ message: 'A "senha" deve ter pelo menos 6 caracteres' });

  return res.status(200).send({ token: '7mqaVRXJSp886CGr' });
};

module.exports = { login };
