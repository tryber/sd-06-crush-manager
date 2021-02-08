module.exports = (req, _res, next) => {
  console.log(`Método: [${req.method}], Caminho: ${req.path}`);
  next();
};
