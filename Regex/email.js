const validEmail = (email) => {
  const validRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  return validRegex.test(email);
};

module.exports = validEmail;
