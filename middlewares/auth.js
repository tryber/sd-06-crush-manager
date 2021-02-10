const { validateToken } = require('../services/validations');

module.exports = async (req, _res, next) => {
  const stringQualquer = req.headers.authorization;
  const token = validateToken(stringQualquer);
  if (token === undefined) return next({ statusCode: 401, message: 'Token não encontrado' });
  if (!token) return next({ statusCode: 401, message: 'Token inválido' });

  return next();
};
