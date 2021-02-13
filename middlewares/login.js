const yup = require('yup');
const genToken = require('rand-token');

const verifyError = (err, res) => {
  res.status(400).json({ message: err.message });
};
const caseSucess = (res) => {
  const token = genToken.generate(16);
  res.status(200).send({
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
async function login(req, res) {
  const { email, password } = req.body;
  schema.validate({
    email,
    password,
  })
    .then(() => caseSucess(res))
    .catch((err) => verifyError(err, res));
}

module.exports = login;
