const { ErrorHandler } = require('../errorHandling/helpers');

const tokenValidator = (token) => {
  const regexValidator = /[a-z0-9]{16}/;
  return regexValidator.test(token);
};

const validateToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new ErrorHandler(401, 'Token não encontrado');
    } else if (!tokenValidator(authorization)) {
      throw new ErrorHandler(401, 'Token inválido');
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { validateToken };
