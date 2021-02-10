const yup = require('yup');

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

module.exports = {
  schema, dateSchema,
};
