const { readFile } = require('../utils/managefile');

// Função resposável pela requisição de leitura de todos os dados,
// com o uso do readFile e um res com status 200 ao retornar os dados.
const readCrushes = async (_req, res) => {
  const crushes = await readFile('crush');
  const data = (JSON.parse(crushes));
  console.log(Array.isArray(data));
  res.status(200).json(data);
};

module.exports = readCrushes;
