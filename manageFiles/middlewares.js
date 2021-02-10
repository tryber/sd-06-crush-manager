const crypto = require('crypto');
const { readFile, writeFile } = require('./manageFiles');

const readMyFile = async (req, res) => {
  const { fileName } = req.params;
  const myCrushes = await readFile(fileName);
  if (myCrushes.length > 0) {
    res.status(200).json((myCrushes));
  } else {
    return res.status(200).json([]);
  }
};

const getCrushByID = async (req, res, next) => {
  const { fileName, id } = req.params;
  const myCrushes = await readFile(fileName);
  const myCrush = myCrushes.find((crush) => crush.id === parseInt(id, 10));

  // console.log(myCrush);

  if (myCrush) {
    res.status(200).json(myCrush);
  } else {
    next({ message: 'Crush não encontrado', statusCode: 404 });
  }
};

const generateToken = (_req, res, next) => {
  const token = crypto.randomBytes(8).toString('hex');
  // console.log(token);
  res.status(200).json({ token });
  next();
};

const validateEmail = (req, _res, next) => {
  const { email } = req.body;
  const emailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;

  if (!email) {
    next({ message: 'O campo "email" é obrigatório', statusCode: 400 });
  }
  if (!emailRegex.test(email)) {
    next({ message: 'O "email" deve ter o formato "email@email.com"', statusCode: 400 });
  }
  next();
};

const validatePassword = (req, _res, next) => {
  const { password } = req.body;
  const SIX = 6;
  if (!password) {
    next({ message: 'O campo "password" é obrigatório', statusCode: 400 });
  }
  if (password.length < SIX) {
    next({ message: 'A "senha" deve ter pelo menos 6 caracteres', statusCode: 400 });
  }
  next();
};

const validateToken = (req, _res, next) => {
  const { authentication } = req.headers;
  const SIXTEEN = 16;

  if (!authentication) {
    next({ message: 'Token não encontrado', statusCode: 401 });
  }
  if (authentication.length < SIXTEEN) {
    next({ message: 'Token inválido', statusCode: 401 });
  }
  next();
};

const validateName = (req, _res, next) => {
  const addCrush = req.body;
  const { name } = addCrush;
  const THREE = 3;

  if (!name) {
    next({ message: 'O campo "name" é obrigatório', statusCode: 400 });
  }
  if (name.length < THREE) {
    next({ message: 'O "name" deve ter pelo menos 3 caracteres', statusCode: 400 });
  }
  next();
};

const validateAge = (req, _res, next) => {
  const addCrush = req.body;
  const { age } = addCrush;
  const EIGHTEEN = 18;

  if (!age) {
    next({ message: 'O campo "age" é obrigatório', statusCode: 400 });
  }
  if (age <= EIGHTEEN) {
    next({ message: 'O crush deve ser maior de idade', statusCode: 400 });
  }
  next();
};

const validateDate = (req, _res, next) => {
  const addCrush = req.body;
  const { date } = addCrush;
  const dateRegex = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
  const ONE = 1;
  const FIVE = 5;

  if (!dateRegex.test(date.dateAt)) {
    next({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"', statusCode: 400 });
  }
  if (!date.rate >= ONE && !date.rate <= FIVE) {
    next({ message: 'O campo "rate" deve ser um inteiro de 1 à 5', statusCode: 400 });
  }
  if (!date || !date.dateAt || !date.rate) {
    next({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios', statusCode: 400 });
  }
  next();
};

const addNewCrush = async (req, res) => {
  const newCrush = req.body;
  const { fileName } = req.params;
  const myCrushes = await readFile(fileName);
  newCrush.id = myCrushes.length + 1;
  const newCrushesList = [...myCrushes, newCrush];

  // console.log(newCrushesList);

  await writeFile(fileName, JSON.stringify(newCrushesList));
  res.status(201).json(newCrushesList);
};

const error = ((err, _req, res, _next) => {
  res.status(err.statusCode || 500).json({ message: err.message });
});

module.exports = {
  readMyFile,
  getCrushByID,
  error,
  generateToken,
  validateEmail,
  validatePassword,
  validateToken,
  validateName,
  validateAge,
  validateDate,
  addNewCrush,
};
