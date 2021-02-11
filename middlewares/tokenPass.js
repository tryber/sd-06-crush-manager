const verifyToken = require('../functions/verifyToken');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  const checkToken = verifyToken(authorization);

  if (checkToken !== true) return res.status(401).send({ message: checkToken });

  next();
};
