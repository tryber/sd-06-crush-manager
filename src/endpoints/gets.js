const fs = require('fs').promises;
const randomString = require('randomstring');

const SUCCESS = 200;
const NOT_FOUND = 404;
const BAD_REQUEST = 400;
const emailValidationRegex = /\S+@\S+\.\S+/;
const emptyCrushList = [];
const firstIndex = 0;
const minimumLength = 1;

module.exports = {
  async getCrushes(_req, res) {
    const data = await fs.readFile('./crush.json', 'utf-8');
    if (data) {
      res.status(SUCCESS).send(JSON.parse(data));
    } else {
      res.status(SUCCESS).send(emptyCrushList);
    }
  },

  async getCrushById(req, res) {
    const crushId = +req.params.id;
    const data = await fs.readFile('./crush.json', 'utf8');
    const selectedCrush = JSON.parse(data).filter((crush) => crush.id === crushId);
    if (selectedCrush.length >= minimumLength) {
      res.status(SUCCESS).send(selectedCrush[firstIndex]);
    } else {
      res.status(NOT_FOUND).json({ message: 'Crush não encontrado' });
    }
  },

  getLogin(req, res) {
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
