const validateEmail = (email) => {
  const comparison = /\S+@\S+\.\S+/;
  return comparison.test(email);
};

const validatePassword = (password) => password.length >= 6;

module.exports = {
  validateEmail,
  validatePassword,
};
