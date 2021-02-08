const randomString = require('randomstring');

const SUCCESS = 200;
const BAD_REQUEST = 400;
const emailValidationRegex = /\S+@\S+\.\S+/;

module.exports = {
  postLogin(req, res) {
    const newToken = randomString.generate(16);
    const { email, password } = req.body.email;
    const validatedEmail = emailValidationRegex.test(email);
    if (!email) {
      res.status(BAD_REQUEST).send({ message: 'O campo "email" é obrigatório' });
    } else if (!validatedEmail) {
      res.status(BAD_REQUEST)
        .send({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    if (!password) {
      res.status(BAD_REQUEST).send({ message: 'O campo "password" é obrigatório' });
    } else if (password.length < 6) {
      res.status(BAD_REQUEST).send({ message: 'O "password" ter pelo menos 6 caracteres' });
    }
    res.status(SUCCESS).send({ token: newToken });
  },
};
