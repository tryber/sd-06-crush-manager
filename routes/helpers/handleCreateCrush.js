const yup = require('yup');
const { isDate } = require('date-fns'); /* https://codedaily.io/tutorials/175/Yup-Date-Validation-with-Custom-Transform */

const handleValidationError = (err, res) => {
  res.status(400).json({ message: err.message });
};

const handleValidationSucessfull = ({ body }, res) => {
  console.log('cara eu juuuuuro que to tentando');
  res.status(201).json({
    id: 5,
    ...body,
  });
};

const dateSchema = yup.object().required().shape({
  datedAt: yup.string()
    .required('O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios')
    .test('true', 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"', (value) => /^[0-9]{2}[/]{1}[0-9]{2}[/]{1}[0-9]{4}$/.test(value)),
  rate: yup.number()
    .required('O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios')
    .max(5, 'O campo "rate" deve ser um inteiro de 1 à 5')
    .min(1, 'O campo "rate" deve ser um inteiro de 1 à 5'),
});

const schema = yup.object().shape({
  name: yup.string()
    .required('O campo "name" é obrigatório')
    .min(3, 'O "name" deve ter pelo menos 3 caracteres'),
  age: yup.number().required('O campo "age" é obrigatório')
    .min(18, 'O crush deve ser maior de idade'),
  date: dateSchema,
});

async function handleCreateCrush(req, res) {
  // try {
  const { name, age, date } = req.body;
  const { authorization } = req.headers;
  console.log(authorization, 'authorization');

  if (!authorization) {
    res.status(401).json({
      message: 'Token não encontrado',
    });
  } else if (authorization.length !== 16) {
    res.status(401).json({
      message: 'Token inválido',
    });
  }

  if (!req.body.date) {
    res.status(400)
      .json(
        { message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' },
      );
    console.log('cai no date --------------------------------------');
    return;
  }
  await schema.validate({
    name,
    age,
    date,
  })
    .then(() => handleValidationSucessfull(req, res))
    .catch((err) => handleValidationError(err, res));
}

module.exports = handleCreateCrush;
