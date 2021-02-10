const { error } = require('../dictionary');

module.exports = (name) => {
  if (!name) throw new Error(error.noName);
  const isValid = name.length >= 3;
  if (!isValid) throw new Error(error.invalidName);
  return isValid;
};
