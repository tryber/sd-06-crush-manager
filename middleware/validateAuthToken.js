const errorMessages = {
  tokenRequired: {
    message: 'Token não encontrado',
  },
  invalidToken: {
    message: 'Token inválido',
  },
};

const UNAUTHORIZED = 401;

const resultTokenRegex = (token) => token.match(/^([A-Z0-9]){16}$/i);

const checkAuthentication = (request, response, next) => {
  const { authorization: authToken } = request.headers;

  if (!authToken) {
    return response.status(UNAUTHORIZED).json(errorMessages.tokenRequired);
  }

  if (!resultTokenRegex(authToken)) {
    return response.status(UNAUTHORIZED).json(errorMessages.invalidToken);
  }

  return next();
};

module.exports = { checkAuthentication };
