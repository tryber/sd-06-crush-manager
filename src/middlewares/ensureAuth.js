const AppError = require('../errors/AppError');
const validateToken = require('../utils/validateToken');

function ensureAuth(request, _response, next) {
  const token = request.headers.authorization;

  if (!token) {
    throw new AppError('Token não encontrado');
  }

  const tokenIsValid = validateToken(token);

  if (!tokenIsValid) {
    throw new AppError('Token inválido');
  }

  return next();
}

module.exports = ensureAuth;
