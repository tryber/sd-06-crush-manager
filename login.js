const validateEmail = (e, reg = /\S+@\S+\.\S+/) => reg.test(e);

const getToken = (req, res) => {
  const { email, password } = req.headers;

  if (!email) {
    res.status(400).send({ message: 'O campo "email" é obrigatório' });
    return;
  }
  if (!validateEmail(email)) {
    res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
    return;
  }

  if (!password) {
    res.status(400).send({ message: 'O campo "password" é obrigatório' });
    return;
  }
  if (password.length < 6) {
    res.status(400).send({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
    return;
  }

  res.send({ token: '7mqaVRXJSp886CGr' });
};

module.exports = { getToken };
