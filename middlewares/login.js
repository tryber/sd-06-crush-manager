// const crypto = require('crypto');

// function verifyEmail(email) {
//   const emailRegex = /^([a-zA-Z0-9_-]+)@([a-zA-Z0-9_-]+)\.com$/gm;
//   return emailRegex.test(email);
// }
// function verifypassword(password) {
//   const passwordRegex = /^\d{6,12}$/gm;
//   return passwordRegex.test(password);
// }

// const login = async (req, res) => {
//   const { email, password } = req.body;
//   const validateEmail = verifyEmail(email);
//   const validatePassword = verifypassword(password);
//   if (validateEmail && validatePassword) {
//     const token = crypto.randomBytes(8).toString('hex');
//     return res.status(200).json({ token });
//   }
//   if (email === '' || !email) {
//     return res.status(400).json({ message: 'O campo "email" é obrigatório' });
//   }
//   if (!validateEmail) {
//     return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
//   }
//   if (password === '' || !password) {
//     return res.status(400).json({ message: 'O campo "password" é obrigatório' });
//   }
//   if (password.lenght < 6) {
//     return res.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
//   }
// };

// module.exports = { login };

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
