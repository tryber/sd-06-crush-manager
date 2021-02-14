const { checkRequestField, validateToken } = require('../utils');

module.exports = function authenticate(request, response, next) {
  const requestHeader = request.headers;

  if (!checkRequestField(requestHeader, 'authorization')) {
    return response.status(401).json(
      {
        message: 'Token não encontrado',
      },
    );
  }

  if (!validateToken(requestHeader.authorization)) {
    return response.status(401).json(
      {
        message: 'Token inválido',
      },
    );
  }

  next();
};
