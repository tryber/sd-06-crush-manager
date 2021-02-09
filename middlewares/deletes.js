const { readFiles, writingFile } = require('../services/reader');

module.exports = {
  async deleteCrushById(req, res, next) {
    const file = await readFiles();
    const crushId = +req.params.id;
    const crushToDel = file.find((crush) => crush.id === crushId);
    if (!crushToDel) return next({ message: 'Crush não encontrado', statusCode: 404 });
    const newFile = file.filter((item) => item !== crushToDel);
    res.status(200).json({ message: 'Crush deletado com sucesso' });
    return writingFile(newFile);
  },
};
