const { readFile, writeFile } = require('./manageFiles');

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

  if (password && password.length < 6) return response.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });

  console.log(password.length);
  next();
};

const updateCrushes = async (request, response) => {
  const newCrush = request.body;
  const { fileName } = request.params;
  const myFile = await readFile(fileName);
  newCrush.id = myFile.length + 1;
  const newFile = [...myFile, newCrush];

  await writeFile(fileName, JSON.stringify(newFile));
  return response.status(201).json(newCrush);
};

const validateToken = (request, response, next) => {
  const { authorization } = request.headers;
  if (!authorization) return response.status(401).json({ message: 'Token não encontrado' });

  if (authorization.length !== 16) return response.status(401).json({ message: 'Token inválido' });

  next();
};

const validateName = (request, response, next) => {
  const newCrush = request.body;
  const { name } = newCrush;

  if (!name) return response.status(400).json({ message: 'O campo "name" é obrigatório' });

  if (name.length < 3) return response.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });

  next();
};

const validateAge = (request, response, next) => {
  const newCrush = request.body;
  const { age } = newCrush;

  if (!age) return response.status(400).json({ message: 'O campo "age" é obrigatório' });

  if (age < 18) return response.status(400).json({ message: 'O crush deve ser maior de idade' });

  next();
};

const validateDate = (request, response, next) => {
  const newCrush = request.body;
  const { date } = newCrush;
  const validDate = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26]))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;

  if (date) {
    const { datedAt, rate } = date;
    if ((!datedAt || !rate) && rate !== 0) return response.status(400).json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  } else {
    return response.status(400).json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  }

  if (date.rate > 5 || date.rate < 1) return response.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });

  if (!validDate.test(date.datedAt)) return response.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });

  next();
};

const updateCrushById = async (request, response) => {
  const updatedCrush = request.body;
  const { fileName, id } = request.params;
  const myFile = await readFile(fileName);
  const crushNotFound = myFile.filter((crush) => crush.id !== parseInt(id, 10));

  updatedCrush.id = parseInt(id, 10);
  const newFile = [...crushNotFound, updatedCrush];
  await writeFile(fileName, JSON.stringify(newFile));
  return response.status(200).json(updatedCrush);
};

const deleteCrushById = async (request, response) => {
  const { fileName, id } = request.params;
  const myFile = await readFile(fileName);
  const crushNotFound = myFile.filter((crush) => crush.id !== parseInt(id, 10));

  await writeFile(fileName, JSON.stringify(crushNotFound));
  return response.status(200).json({ message: 'Crush deletado com sucesso' });
};

const findCrush = async (request, response) => {
  const { q } = request.query;
  const { fileName } = request.params;

  const myFile = await readFile(fileName);

  const crushesFound = myFile.filter((crush) => crush.name.indexOf(q) !== -1);
  response.status(200).json(crushesFound);
};

module.exports = {
  read,
  parser,
  getById,
  tokenResponse,
  validateEmail,
  validatePassword,
  updateCrushes,
  validateToken,
  validateName,
  validateAge,
  validateDate,
  updateCrushById,
  deleteCrushById,
  findCrush,
};
