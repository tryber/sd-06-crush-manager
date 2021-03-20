const readFile = require('./read.js');
const writeFile = require('./write.js');

const validateCrushId = async (req, res, _next) => {
  const id = +req.params.id;
  const { name, age, date } = req.body;
  let message = '';

  if (!name) {
    message = 'O campo "name" é obrigatório';
    return res.status(400).send({ message });
  }
  if (!age || age === '') {
    message = 'O campo "age" é obrigatório';
    return res.status(400).send({ message });
  }
  if (age < 18) {
    message = 'O crush deve ser maior de idade';
    return res.status(400).send({ message });
  }

  if (name.length < 4) {
    message = 'O "name" deve ter pelo menos 3 caracteres';
    return res.status(400).send({ message });
  }

  if (!date || date === '' || !date.datedAt || date.rate === undefined) {
    message = 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios';
    return res.status(400).send({ message });
  }

  if (date.rate > 5 || date.rate < 1) {
    message = 'O campo "rate" deve ser um inteiro de 1 à 5';
    return res.status(400).send({ message });
  }

  const regex = /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/;
  const isValid = regex.test(String(date.datedAt).toLocaleLowerCase());

  if (!isValid) {
    message = 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"';
    return res.status(400).send({ message });
  }

  const data = await readFile();

  if (!data) return res.status(500).send({ message: 'Não foi possível ler o arquivo!' });
  const file = data.findIndex((crush) => crush.id === id);
  const newPersona = { id, name, age, date };
  data[file] = newPersona;
  writeFile(data);
  res.status(200).send(data[file] = newPersona);
};

module.exports = validateCrushId;
