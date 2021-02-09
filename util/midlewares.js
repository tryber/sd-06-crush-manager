const { readFile } = require('./manageFiles');

const read = async (request, response) => {
  const { fileName } = request.params;
  const myFile = await readFile(fileName);
  response.status(200).json(myFile);
};

const parser = (request, _response, next) => {
  console.log({
    data: new Date(),
    method: request.method,
    route: request.originalUrl,
  });
  next();
};

const getById = async (request, response) => {
  try {
    const { fileName, id } = request.params;
    const myFile = await readFile(fileName);
    const crushFound = myFile.find((crush) => crush.id === parseInt(id, 10));
    if (!crushFound) throw new Error('Crush não encontrado');
    return response.status(200).json(crushFound);
  } catch (err) {
    return response.status(404).json({ message: err.message });
  }
};

const tokenResponse = (_request, response) =>
  response.status(200).json({
    token: '7mqaVRXJSp886CGr',
  });

const validateEmail = (request, response, next) => {
  const { email } = request.body;
  const validEmail = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;

  if (!email) return response.status(400).json({ message: 'O campo "email" é obrigatório' });

  if (!validEmail.test(email)) return response.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });

  next();
};

const validatePassword = (request, response, next) => {
  const { password } = request.body;

  if (!password) return response.status(400).json({ message: 'O campo "password" é obrigatório' });

  if (password.length < 6) return response.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });

  next();
};

module.exports = {
  read,
  parser,
  getById,
  tokenResponse,
  validateEmail,
  validatePassword,
};
