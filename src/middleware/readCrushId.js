const { readFile } = require('../utils/managefile');

// Função responsável pela leitura dos dados com o uso do readFile, selecionando
// o id obtido pelos parâmetros da URL e comparando com o id dos dados retornados,
// e, se o dado existir, retornando um res com status 200 com o dado, senão um 404 com o erro.
const readCrushId = async (req, res) => {
  const crushes = await readFile('crush');
  const id = parseInt(req.params.id, 10);
  const element = JSON.parse(crushes).find((e) => e.id === id);

  if (!element) {
    return res.status(404).json({ message: 'Crush não encontrado' });
  }
  return res.status(200).json(element);
};

module.exports = readCrushId;
