const {
  readFromFile,
  validateEmail,
  validatePassword,
  createToken,
} = require('../services');

const getAllCrushes = async (_request, response) => {
  const allCrushes = await readFromFile();

  return response.status(200).json(allCrushes);
};

const getCrush = async (request, response) => {
  const { id } = request.params;
  const allCrushes = await readFromFile();
  const crush = allCrushes.find((element) => element.id === +id);

  if (!crush) {
    return response.status(404).json({ message: 'Crush não encontrado' });
  }

  return response.status(200).json(crush);
};

const getToken = async (request, response) => {
  const { email, password } = request.body;
  if (!email) {
    response.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!password) {
    response.status(400).json({ message: 'O campo "password" é obrigatório' });
  }

  if (validateEmail(email)) {
    if (validatePassword(password)) {
      const token = createToken();
      return response.status(200).json({ token });
    }
    return response
      .status(400)
      .json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }
  return response
    .status(400)
    .json({ message: 'O "email" deve ter o formato "email@email.com"' });
};

module.exports = {
  getAllCrushes,
  getCrush,
  getToken,
};
