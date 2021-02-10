const { error } = require('../dictionary');

const validateDatedAt = (date) => {
  if (!date) throw new Error(error.noDate);
  const regex = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;
  const isValid = regex.test(date);
  if (!isValid) throw new Error(error.invalidDatedAt);
  return isValid;
};

const validateRate = (rate) => {
  if (rate === 0) throw new Error(error.invalidRate);
  if (!rate) throw new Error(error.noDate);
  const regex = /^[1-5]$/;
  const isValid = regex.test(rate);
  if (!isValid) throw new Error(error.invalidRate);
  return isValid;
};

module.exports = (date) => {
  if (!date) throw new Error(error.noDate);
  const { datedAt, rate } = date;
  return validateDatedAt(datedAt) && validateRate(rate);
};
