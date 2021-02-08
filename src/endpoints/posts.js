const randomString = require('randomstring');

const SUCCESS = 200;
const BAD_REQUEST = 400;
const emailValidationRegex = /\S+@\S+\.\S+/;

module.exports = {
  handleLogin(req, res) {
    const newToken = randomString.generate(16);
    const { email, password } = req.body;
    const validatedEmail = emailValidationRegex.test(email);

    if (!email) {
      res.status(BAD_REQUEST).json({ message: 'O campo "email" é obrigatório' });
    } else if (!validatedEmail) {
      res.status(BAD_REQUEST)
        .json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }

    if (!password || password.length === 0) {
      res.status(BAD_REQUEST).json({ message: 'O campo "password" é obrigatório' });
    } else if (password.length < 6) {
      res.status(BAD_REQUEST)
        .json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
    }

    const generatedToken = { token: newToken };
    res.status(SUCCESS).json(generatedToken);
  },
};
