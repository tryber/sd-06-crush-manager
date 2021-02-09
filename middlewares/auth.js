const { validateToken } = require('../services/validators');

module.exports = (req, _res, next) => {
  const { headers: { authorization } } = req;
  validateToken(authorization);
  next();
};
