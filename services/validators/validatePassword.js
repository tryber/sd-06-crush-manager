const { error } = require('../dictionary');

module.exports = (password) => {
  if (!password) throw new Error(error.noPassword);
  const regex = /^[A-Za-zÀ-ÿ0-9_-]{6,}$/;
  const isValid = regex.test(password);
  if (!isValid) throw new Error(error.invalidPassword);
  return isValid;
};
