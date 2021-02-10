const { error } = require('../dictionary');

module.exports = (email) => {
  if (!email) throw new Error(error.noEmail);
  const regex = /\S+@\S+\.\S+/;
  const isValid = regex.test(email);
  if (!isValid) throw new Error(error.invalidEmail);
  return isValid;
};
