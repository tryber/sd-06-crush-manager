const buildToken = () => {
  const abc = 'abcdefghijklmnopqrstuvwxyz1234567890'.split('');
  let token = '';
  for (let i = 0; i < 16; i += 1) {
    token += abc[Math.floor(Math.random() * abc.length)];
  }
  return token;
};

const checkEmail = (email) => {
  let message = 'ok';
  const regExEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i;
  if (email === null || email === '') {
    message = 'O campo "email" é obrigatório';
  } else if (!regExEmail.test(email)) {
    message = 'O "email" deve ter o formato "email@email.com"';
  }
  return message;
};

const checkPassword = (password) => {
  let message = 'ok';
  const regExPassword = /^.{6,}$/;
  if (password === null || password === '') {
    message = 'O campo "password" é obrigatório';
  } else if (!regExPassword.test(password)) {
    message = 'A "senha" deve ter pelo menos 6 caracteres';
  }
  return message;
};

const generateToken = (req, res) => {
  const { email = '', password = '' } = req.body;
  const msgEmail = checkEmail(email);
  const msgPassword = checkPassword(password);

  if (msgEmail !== 'ok') {
    res.status(400).send({ message: msgEmail });
  } else if (msgPassword !== 'ok') {
    res.status(400).send({ message: msgPassword });
  } else {
    res.send({ token: buildToken() });
  }
};

module.exports = generateToken;
