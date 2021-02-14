const {
  readFromFile,
  writeToFile,
  validateEmail,
  validatePassword,
  validateDate,
  validateRate,
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
    return response
      .status(400)
      .json({ message: 'O campo "email" é obrigatório' });
  }

  if (!password) {
    return response
      .status(400)
      .json({ message: 'O campo "password" é obrigatório' });
  }

  if (email && validateEmail(email)) {
    if (password && validatePassword(password)) {
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

const checkToken = (request, response, next) => {
  const { authorization } = request.headers;
  if (!authorization) {
    return response.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorization.length !== 16) {
    return response.status(401).json({ message: 'Token inválido' });
  }
  next();
};

const createCrush = async (request, response) => {
  const { name, age, date } = request.body;

  const allCrushes = await readFromFile();
  const id = allCrushes.length + 1;
  allCrushes.push({ id, name, age, date });
  await writeToFile(allCrushes);

  return response.status(201).json({ id, name, age, date });
};

const checkCrush = async (request, response, next) => {
  const { name, age, date } = request.body;

  if (!name) {
    return response
      .status(400)
      .json({ message: 'O campo "name" é obrigatório' });
  }
  if (!age) {
    return response
      .status(400)
      .json({ message: 'O campo "age" é obrigatório' });
  }
  if (!date) {
    return response.status(400).json({
      message:
        'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    });
  }
  if (name && name.length < 3) {
    return response
      .status(400)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  if (age < 18) {
    return response
      .status(400)
      .json({ message: 'O crush deve ser maior de idade' });
  }
  if (date) {
    const { datedAt, rate } = date;
    if (!datedAt || (!rate && rate !== 0)) {
      return response.status(400).json({
        message:
          'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
      });
    }
    if (!validateDate(datedAt)) {
      return response
        .status(400)
        .json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    if (!validateRate(rate)) {
      return response
        .status(400)
        .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
  }
  next();
};

const updateCrush = async (request, response) => {
  const id = +request.params.id;
  const { name, age, date } = request.body;
  const allCrushes = await readFromFile();

  const findCrush = allCrushes.map((element) => {
    if (element.id === id) {
      return { name, age, id, date };
    }
    return element;
  });
  console.log(findCrush);
  await writeToFile(findCrush);

  return response.status(200).json({ id, name, age, date });
};

const deleteCrush = async (request, response) => {
  const id = +request.params.id;
  const allCrushes = await readFromFile();

  const findCrush = allCrushes.filter((element) => element.id !== id);

  await writeToFile(findCrush);

  return response.status(200).json({ message: 'Crush deletado com sucesso' });
};

module.exports = {
  getAllCrushes,
  getCrush,
  createCrush,
  checkCrush,
  updateCrush,
  deleteCrush,
  getToken,
  checkToken,
};
