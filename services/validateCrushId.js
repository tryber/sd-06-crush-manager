const readFile = require('./readFile.js');

const validateCrushId = async (request, response, _next) => {
  const { id } = request.params;
  const { name, age, date } = request.body;
  let message = '';
  const FAIL = 400;
  const SUCCESS = 200;
  const INTERNAL_ERROR = 500;

  if (!name) {
    message = 'O campo "name" é obrigatório';
    return response.status(FAIL).send({ message });
  }
  if (!age || age === '') {
    message = 'O campo "age" é obrigatório';
    return response.status(FAIL).send({ message });
  }
  if (age < 18) {
    message = 'O crush deve ser maior de idade';
    return response.status(FAIL).send({ message });
  }

  if (name.length < 4) {
    message = 'O "name" deve ter pelo menos 3 caracteres';
    return response.status(FAIL).send({ message });
  }

  if (!date || date === '' || !date.datedAt || date.rate === undefined) {
    message = 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios';
    return response.status(FAIL).send({ message });
  }

  if (date.rate > 5 || date.rate < 1) {
    message = 'O campo "rate" deve ser um inteiro de 1 à 5';
    return response.status(FAIL).send({ message });
  }

  const regexDate = /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/;
  const isDateValid = regexDate.test(String(date.datedAt).toLocaleLowerCase());

  if (!isDateValid) {
    message = 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"';
    return response.status(FAIL).send({ message });
  }

  const data = await readFile();

  if (!data) return response.status(INTERNAL_ERROR).send({ message: 'Não foi possível ler o arquivo!' });

  const index = data.findIndex((crush) => crush.id === id);

  const newCrush = { id, name, age, date };
  // data.push(newCrush);

  // next();
  response.status(SUCCESS).send(data[index] = newCrush);
};

module.exports = validateCrushId;
