const validateName = (name) => {
  if (name.length < 3) return true;
  return false;
};

const validateAge = (age) => {
  if (age < 18) return true;
  return false;
};

const validateDatePattern = (date) => {
  const reg = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;
  return reg.test(date);
};

module.exports = { validateAge, validateDatePattern, validateName };
