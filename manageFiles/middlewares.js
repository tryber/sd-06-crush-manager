const crypto = require('crypto');
const { readFile } = require('./manageFiles');

const readMyFile = async (req, res) => {
  const { fileName } = req.params;
  const myCrushes = await readFile(fileName);
  if (myCrushes.length > 0) {
    res.status(200).json((myCrushes));
  } else {
    res.status(200).json([]);
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
  console.log(token);
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

const validatePassword = (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    next({ message: 'O campo "password" é obrigatório', statusCode: 400 });
  }
  if (password.length < 6) {
    next({ message: 'A "senha" deve ter pelo menos 6 caracteres', statusCode: 400 });
  }
  next();
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
};
