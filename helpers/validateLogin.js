const validateEmail = (email) => {
  const reg = /\S+@\S+\.\S+/;
  return reg.test(email);
};

const validatePassword = (password) => {
  const reg = /^.{6,}$/;
  return reg.test(password);
};

module.exports = { validateEmail, validatePassword };
