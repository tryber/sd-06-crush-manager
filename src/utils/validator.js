const emailValidation = (email) => {
  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  return !regex.test(email);
};

const passwordValidation = (password) => {
  const regex = /^\d{6,}$/gm;
  return !regex.test(password);
};

module.exports = {
  emailValidation,
  passwordValidation,
};
