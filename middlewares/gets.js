const { readFiles } = require('../services/reader');

module.exports = {
  async getCrushs(_req, res, next) {
    const file = await readFiles();
    if (!file) return next({ message: 'Não foi possível ler o arquivo!', statusCode: 500 });
    if (file.length > 0) {
      res.status(200).json(file);
    } else {
      res.status(200).json([]);
    }
  },

  async getCrushById(req, res, next) {
    const file = await readFiles();
    if (!file) return next({ message: 'Não foi possível ler o arquivo!', statusCode: 500 });
    const crushId = +req.params.id;
    const newFile = file.find((crush) => crush.id === crushId);
    if (newFile) return res.status(200).json(newFile);
    next({ message: 'Crush não encontrado', statusCode: 404 });
  },
};
