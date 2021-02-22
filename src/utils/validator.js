// Função genérica de validação do email com regex.
const emailValidation = (email) => {
  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  return !regex.test(email);
};

// Função genérica de validação do password com regex.
const passwordValidation = (password) => {
  const regex = /^\d{6,}$/gm;
  return !regex.test(password);
};

// Função genérica de validação do date com regex.
const dateValidation = (data) => {
  const regex = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
  return !regex.test(data);
};

module.exports = {
  emailValidation,
  passwordValidation,
  dateValidation,
};
