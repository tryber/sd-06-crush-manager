const yup = require('yup');
const fs = require('fs');

// const readDB = async () => {
//   const crush = await fs.readFile('crush.json', 'utf-8', (err) => {
//     if (err) throw new Error(err);
//   });
//   return JSON.parse(crush);
// };

const writeInDB = async (crush, res) => {
  fs.writeFile('crush.json', 'utf-8', JSON.stringify(crush), (err) => {
    if (err) throw new Error(err);
  });
  return res.status(201).json(crush);
};

const handleError = (err, res) => res.status(400).json({ message: err.message });

const Dateschema = yup.object({ datedAt: yup.date(), rate: yup.number().test('O campo "rate" deve ser um inteiro de 1 à 5', (value) => value > 1 && value < 5) }).required();

const schema = yup.object().shape({
  name: yup.string().required('O campo "name" é obrigatório').min(3, 'O "name" deve ter pelo menos 3 caracteres'),
  age: yup.number().required('O campo "age" é obrigatório').min(18, 'O crush deve ser maior de idade'),
  date: Dateschema,
});

async function searchCrush(req, res) {
  const { name, age, date } = req.body;
  // if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  // if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  // if (age < 18) return res.status(400).json({ message: 'O crush deve ser maior de idade' });
  // if (rate < || rate > 5) return res.status(400)
  // .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  schema.validate({
    name,
    age,
    date,
  })
    .then(() => writeInDB(res))
    .catch((err) => handleError(err, res));
}

module.exports = searchCrush;
