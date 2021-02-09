const emailValidate = (email) => {
  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  return !regex.test(email);
};

const passwordValidate = (password) => {
  const regex = /^\d{6,}$/gm;
  return !regex.test(password);
};

const dataValidate = (data) => {
  const regex = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/gm;
  return !regex.test(data);
};

module.exports = {
  emailValidate,
  passwordValidate,
  dataValidate,
};
