const emailValidation = (email) => {
  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  return !regex.test(email);
};

const passwordValidation = (password) => {
  const regex = /^\d{6,}$/gm;
  return !regex.test(password);
};

const dataValidation = (data) => {
  const regex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  return !regex.test(data);
};

module.exports = {
  emailValidation,
  passwordValidation,
  dataValidation,
};
