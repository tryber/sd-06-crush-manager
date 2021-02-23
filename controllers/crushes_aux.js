const validateName = (name) => String(name).length >= 3;

const validateAge = (age) => Number.isInteger(age) && age >= 18;

const validateDate = (date) => {
  // https://stackoverflow.com/questions/7388001/javascript-regex-to-validate-date-format
  const dateRegex = /^\d{2}[.-/]\d{2}[.-/]\d{4}$/;
  return dateRegex.test(date);
};

const validateRate = (rate) => Number.isInteger(rate) && rate >= 1 && rate <= 5;

module.exports = {
  validateName,
  validateAge,
  validateDate,
  validateRate,
};
