function handleAuthorization(req, res, next) {
  const { authorization } = req.headers;
  console.log(authorization);
  const token = authorization;

  let data = {};
  if (!token) {
    data = {
      valid: false,
      message: 'Token não encontrado',
    };
  } else if (token.length !== 16) {
    data = {
      valid: false,
      message: 'Token inválido',
    };
  } else {
    data.valid = true;
  }

  try {
    if (!data.valid) throw new Error(data.message);
    next();
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
}

module.exports = handleAuthorization;
