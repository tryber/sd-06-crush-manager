const {
  validateName, validateAge, validateDate, validateToken,
} = require('../services/validators');

const { error } = require('../services/dictionary');

module.exports = (req, res, next) => {
  const { body: { name, age, date }, headers: { authorization } } = req;
  // if (!authorization) throw new Error(error.noToken);
  const isValid = validateName(name)
    && validateAge(age) && validateDate(date) && validateToken(authorization);
  if (!isValid) throw new Error(error.unexpected);
  next();
};
