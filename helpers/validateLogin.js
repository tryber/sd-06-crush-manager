const validateEmail = (email) => {
  const reg = /^[^@]+@[^@]+\.[^@]+$/;
  return reg.test(String(email).toLowerCase());
};

const validatePassword = (password) => {
  if (password.length > 5) return true;
  return false;
};

module.exports = { validateEmail, validatePassword };
