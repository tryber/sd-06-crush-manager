function handleValidateID(req, res, next) {
  const { id } = req.params;
  const { readData } = res.locals;
  const parsedId = parseInt(id, 10);
  const isValidId = readData.find((crush) => crush.id === parsedId);
  req.body.id = parsedId;
  if (!isValidId) {
    res.status(404).json('pagina nao encontrada');
    return;
  }
  next();
}

module.exports = handleValidateID;
