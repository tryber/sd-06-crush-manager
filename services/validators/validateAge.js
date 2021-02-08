const { error } = require('../dictionary');

module.exports = (age) => {
  if (!age) throw new Error(error.noAge);
  const regex = /^(1[89]|[2-9]\d|[1-9]\d{2,})$/;
  const isValid = regex.test(age);
  if (!isValid) throw new Error(error.invalidAge);
  return isValid;
};
