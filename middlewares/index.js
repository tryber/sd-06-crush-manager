const crypto = require('crypto');
const { readCrushFile, isValidEmail, isValidPassword } = require('../utils');

const SUCCESS = 200;

const standardResponse = (_request, response) => response.status(SUCCESS).send();

const getCrushes = async (_req, res) => {
  const allCrushes = await readCrushFile();
  return res.status(SUCCESS).send(allCrushes);
};

const getCrush = async (req, res) => {
  const allCrushes = await readCrushFile();
  const { id } = req.params;
  const crush = allCrushes.find((each) => each.id === +id);
  if (crush) {
    return res.status(SUCCESS).send(crush);
  }
  const message = 'Crush não encontrado';
  return res.status(404).send({ message });
};

const getToken = async (req, res) => {
  const { email, password } = req.body;
  if (!email) return res.status(400).send({ message: 'O campo "email" é obrigatório' });
  if (!password) return res.status(400).send({ message: 'O campo "password" é obrigatório' });

  if (isValidEmail(email)) {
    if (isValidPassword(password)) {
      const token = crypto.randomBytes(8).toString('hex');
      return res.status(200).send({ token });
    }
    return res.status(400).send({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }
  return res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
};

const addCrush = () => {

};

module.exports = {
  getCrushes,
  getCrush,
  standardResponse,
  getToken,
  addCrush,
};
