const { validateEmail, validatePassword } = require('../services/validators');
const { error } = require('../services/dictionary');
const { generateToken } = require('../services/utils');

module.exports = (req, _res, next) => {
  const { body: { email, password } } = req;
  const isValid = validateEmail(email) && validatePassword(password);
  if (!isValid) throw new Error(error.unexpected);
  req.token = generateToken();
  next();
};
