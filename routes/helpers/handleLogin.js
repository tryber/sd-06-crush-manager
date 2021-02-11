const yup = require('yup');
const generator = require('rand-token');

const handleValidationError = (err, res) => {
  res.status(400).json({ message: err.message });
};

const handleValidationSucessfull = (res) => {
  const token = generator.generate(16);
  res.status(200).json({
    token,
  });
};

const schema = yup.object().shape({
  email: yup.string()
    .email('O "email" deve ter o formato "email@email.com"')
    .required('O campo "email" é obrigatório')
    .test(
      'o campo "email" é obrigatório',
      'is not correct',
      (value) => value !== '',
    ),
  password: yup.string()
    .required('O campo "password" é obrigatório')
    .min(6, 'A "senha" deve ter pelo menos 6 caracteres')
    .test(
      'O campo "password" é obrigatório',
      'is not correct',
      (value) => value !== '',
    ),
});

async function handleLogin(req, res) {
  // try {
  const { email, password } = req.body;

  schema.validate({
    email,
    password,
  })
    .then(() => handleValidationSucessfull(res))
    .catch((err) => handleValidationError(err, res));
}

module.exports = handleLogin;
