const crypto = require('crypto');
const { readCrushFile, isValidEmail, isValidPassword } = require('../utils');

const SUCCESS = 200;

const standardResponse = (_request, response) => {
  response.status(SUCCESS).send();
};

const getCrushes = async (_req, res) => {
  const allCrushes = await readCrushFile();
  res.status(SUCCESS).send(allCrushes);
};

const getCrush = async (req, res) => {
  const allCrushes = await readCrushFile();
  const { id } = req.params;
  const crush = allCrushes.find((each) => each.id === +id);
  if (crush) {
    res.status(SUCCESS).send(crush);
  } else {
    const message = 'Crush não encontrado';
    res.status(404).send({ message });
  }
};

const getToken = async (req, res) => {
  const { email, password } = req.body;
  if (!email) res.status(400).send({ message: 'O campo "email" é obrigatório' });
  if (!password) res.status(400).send({ message: 'O campo "password" é obrigatório' });

  if (isValidEmail(email)) {
    if (isValidPassword(password)) {
      const token = crypto.randomBytes(8).toString('hex');
      res.status(200).send({ token });
    } else {
      res.status(400).send({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
    }
  } else {
    res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
};

module.exports = {
  getCrushes,
  getCrush,
  standardResponse,
  getToken,
};
