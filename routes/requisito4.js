const { writeFile, readFile } = require('../utils/manageFiles');

const SUCCESS = 200;
const ERROR401 = 401;
const ERROR400 = 400;
const fileName = 'crush.json';

const addCrush = async (request, response, _next) => {
  const requestHeaders = request.headers;
  const { token } = requestHeaders;
  const crushToAdd = request.body;
  const dateFormat = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;

  if (!token) response.status(ERROR401).json({ message: 'Token não encontrado' });
  if (token) {
    if (token.length < 16) response.status(ERROR401).json({ message: 'Token inválido' });
  }

  if (crushToAdd) {
    const { name, age, date } = crushToAdd;
    if (!name) response.status(ERROR400).json({ message: 'O campo "name" é obrigatório' });
    if (name.length < 3) response.status(ERROR400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    if (!age) response.status(ERROR400).json({ message: 'O campo "age" é obrigatório' });
    if (parseInt(age, 10) < 18) response.status(ERROR400).json({ message: 'O crush deve ser maior de idade' });

    if (!date) response.status(ERROR400).json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
    if (date) {
      if (!date.datedAt || !date.rate) response.status(ERROR400).json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
      if (!Number.isInteger(date.rate) || date.rate < 1 || date.rate > 5) response.status(ERROR400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
      const dateInput = date.datedAt;
      if (!dateFormat.test(dateInput)) response.status(ERROR400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
    }
  }
  const file = await readFile(fileName);
  const fileToUpdate = JSON.parse(file);
  fileToUpdate.push(crushToAdd);

  await writeFile(fileName, JSON.stringify(fileToUpdate, 0, 2));

  response.status(SUCCESS).send(crushToAdd);
};

module.exports = addCrush;
