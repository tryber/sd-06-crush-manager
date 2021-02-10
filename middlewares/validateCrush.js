const { validateName, validateAge, validateDate } = require('../services/validators');

const { error } = require('../services/dictionary');

module.exports = (req, _res, next) => {
  const { body: { name, age, date } } = req;
  const isValid = validateName(name)
    && validateAge(age) && validateDate(date);
  if (!isValid) throw new Error(error.unexpected);
  next();
};
