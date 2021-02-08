const read = require('../services/reader');

module.exports = {
  async getCrushs(_req, res, next) {
    const file = await read();
    if (!file) return next({ message: 'Não foi possível ler o arquivo!', statusCode: 500 });
    if (file.length > 0) {
      res.status(200).json(file);
    } else {
      res.status(200).json([]);
    }
    return next();
  },

  async getCrushById(req, res, next) {
    const file = await read();
    const crushId = +req.params.id;
    if (!file && !crushId) return next({ message: 'Crush não encontrado', statusCode: 404 });
    if (crushId) {
      const result = await file.find((crush) => crush.id === crushId);
      res.status(200).send(result);
    }
    return next();
  },
};
