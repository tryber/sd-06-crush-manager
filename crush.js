const fs = require('fs').promises;

const readFilePromise = fs.readFile;
const writeFilePromise = fs.writeFile;
const file = 'crush.json';

const getAllCrushes = async (_req, res) => {
  readFilePromise(file)
    .then((content) => res.status(200).send(JSON.parse(content)))
    .catch((error) => console.log(error));
};

const getCrushById = async (req, res) => {
  const { id } = req.params;

  readFilePromise(file)
    .then((content) => {
      res.status(200);

      return JSON.parse(content);
    })
    .then((json) => {
      const selectedCrush = json.find((crush) => Number(crush.id) === Number(id));

      if (!selectedCrush) return res.status(404).send({ message: 'Crush não encontrado' });
      return res.send(selectedCrush);
    })
    .catch((error) => console.log(error));
};

const addCrush = async (req, res) => {
  const { headers, body } = req;
  const { authorization } = headers;
  const { name, age, date } = body;

  if (!authorization) return res.status(401).send({ message: 'Token não encontrado' });
  if (!name) return res.status(400).send({ message: 'O campo "name" é obrigatório' });
  if (!age) return res.status(400).send({ message: 'O campo "age" é obrigatório' });
  if (!date) return res.status(400).send({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });

  const { datedAt, rate } = date;

  if (!datedAt || !rate) return res.status(400).send({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });

  const dateFormatRegEx = /^[0-3][0-9]\/[0-1][0-9]\/[1-2][0-9][0-9][0-9]/;
  const tokenIsValid = authorization.length === 16;
  const nameIsValid = name.length >= 3;
  const ageIsValid = age >= 18;
  const datedAtFormatIsValid = dateFormatRegEx.test(datedAt);
  const rateIsValid = rate >= 1 && rate <= 5;

  if (!tokenIsValid) return res.status(401).send({ message: 'Token inválido' });
  if (!nameIsValid) return res.status(400).send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  if (!ageIsValid) return res.status(400).send({ message: 'O crush deve ser maior de idade' });
  if (!datedAtFormatIsValid) return res.status(400).send({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  if (!rateIsValid) return res.status(400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });

  let allCrushes = await readFilePromise(file)
    .then((content) => JSON.parse(content))
    .catch((error) => console.log(error));

  const { id: lastId } = allCrushes.slice(-1)[0];

  const crushToAdd = {
    name,
    age,
    id: lastId + 1,
    date,
  };

  allCrushes = JSON.stringify(allCrushes.concat(crushToAdd));

  await writeFilePromise(file, allCrushes, 'utf8');

  return res.status(201).send(crushToAdd);
};

const editCrush = async (req, res) => {
  const { headers, body, params } = req;
  const { authorization } = headers;
  const { name, age, date } = body;
  const { id: idToEdit } = params;

  if (!authorization) return res.status(401).send({ message: 'Token não encontrado' });
  if (!name) return res.status(400).send({ message: 'O campo "name" é obrigatório' });
  if (!age) return res.status(400).send({ message: 'O campo "age" é obrigatório' });
  if (!date) return res.status(400).send({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });

  const { datedAt, rate } = date;
  const rateInvalid = rate === undefined && rate !== 0;

  if (!datedAt || rateInvalid) return res.status(400).send({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });

  const dateFormatRegEx = /^[0-3][0-9]\/[0-1][0-9]\/[1-2][0-9][0-9][0-9]/;
  const tokenIsValid = authorization.length === 16;
  const nameIsValid = name.length >= 3;
  const ageIsValid = age >= 18;
  const datedAtFormatIsValid = dateFormatRegEx.test(datedAt);
  const rateIsValid = rate >= 1 && rate <= 5;

  if (!tokenIsValid) return res.status(401).send({ message: 'Token inválido' });
  if (!nameIsValid) return res.status(400).send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  if (!ageIsValid) return res.status(400).send({ message: 'O crush deve ser maior de idade' });
  if (!datedAtFormatIsValid) return res.status(400).send({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  if (!rateIsValid) return res.status(400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });

  let allCrushes = await readFilePromise(file)
    .then((content) => JSON.parse(content))
    .catch((error) => console.log(error));

  let crushToEdit = allCrushes.find((crush) => crush.id === Number(idToEdit));

  allCrushes = JSON.stringify(
    allCrushes.map((crush) => {
      if (crush.id === Number(idToEdit)) {
        crushToEdit = {
          name,
          age,
          id: Number(idToEdit),
          date,
        };

        return crushToEdit;
      }

      return crush;
    }),
  );

  await writeFilePromise(file, allCrushes, 'utf8');

  return res.status(200).send(crushToEdit);
};

module.exports = {
  getAllCrushes,
  getCrushById,
  addCrush,
  editCrush,
};
