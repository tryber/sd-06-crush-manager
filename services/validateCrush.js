const readFile = require('./readFile.js');

const validateDate = (myDate) => {
  const regex = /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/;
  return regex.test(String(myDate).toLocaleLowerCase());
};

const validateToken = async (req, res) => {
  const TOKEN_STATUS = 401;

  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(TOKEN_STATUS).json({ message: 'Token não encontrado' });
  }
  if (authorization.length !== 16) {
    return res.status(TOKEN_STATUS).json({ message: 'Token inválido' });
  }
};

const validateCrush = async (request, response) => {
  const data = await readFile();
  console.log(data);

  const { name, age, date } = request.body;
  // const { datedAt, rate } = date;

  let message = '';
  const FAIL = 400;
  const SUCCESS = 201;
  const INTERNAL_ERROR = 500;

  //
  validateToken(request, response);
  // asd

  if (!name) {
    message = 'O campo "name" é obrigatório';
    return response.status(FAIL).json({ message });
  }
  if (!age || age === '') {
    message = 'O campo "age" é obrigatório';
    return response.status(FAIL).json({ message });
  }
  if (age < 18) {
    message = 'O crush deve ser maior de idade';
    return response.status(FAIL).json({ message });
  }

  if (name.length < 4) {
    message = 'O "name" deve ter pelo menos 3 caracteres';
    return response.status(FAIL).json({ message });
  }

  if (!date || date === '' || !date.datedAt || date.rate === undefined) {
    message = 'O campo date é obrigatório e datedAt e rate não podem ser vazios';
    return response.status(FAIL).json({ message });
  }

  if (date.rate > 5 || date.rate < 1) {
    message = 'O campo "rate" deve ser um inteiro de 1 à 5';
    return response.status(FAIL).json({ message });
  }
  if (!validateDate(date.datedAt)) {
    message = 'O campo "datedAt" deve ter o formato "dd/mm/aaaa';
    return response.status(FAIL).json({ message });
  }

  // const data = await readFile();
  // console.log(data);
  // const data = JSON.parse(await readFile());
  // const data = request;
  // console.log(data);
  if (!data) return response.status(INTERNAL_ERROR).send({ message: 'Não foi possível ler o arquivo!' });
  const id = data.length + 1;

  // console.log(typeof data);
  data.push({ name, age, id, date });
  response.status(SUCCESS).json(data);
  // next();
};

module.exports = validateCrush;
