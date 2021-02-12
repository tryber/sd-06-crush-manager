const emailValid = (email) => {
  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  return !regex.test(email);
};

const passwordValid = (password) => {
  const regex = /^\d{6,}$/gm;
  return !regex.test(password);
};

const dateValid = (date) => {
  const regex = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
  return !regex.test(date);
};

module.exports = {
  emailValid,
  passwordValid,
  dateValid,
};
