const AppError = require('../errors/AppError');
const validateToken = require('../utils/validateToken');

function ensureAuth(request, _response, next) {
  const token = request.headers.authorization;

  if (!token) {
    throw new AppError('Token não encontrado', 401);
  }

  const tokenIsValid = validateToken(token);

  if (!tokenIsValid) {
    throw new AppError('Token inválido', 401);
  }

  return next();
}

module.exports = ensureAuth;
