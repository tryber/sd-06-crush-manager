module.exports = (req, _res, next) => {
  if (!req.headers.authorization) {
    return next({ status: 401, message: 'message' });
  }

  return next();
};
