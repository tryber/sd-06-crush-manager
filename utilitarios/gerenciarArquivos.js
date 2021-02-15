// Neste arquivo será criada a função de leitura do fs.
// Na importação do fs traz recursos de promise
const fs = require('fs').promises;
const path = require('path').resolve;

const lerArquivo = async (nomeArquivo) => {
  const arquivo = await fs.readFile(path(__dirname, '..', nomeArquivo));
  return arquivo;
};

module.exports = lerArquivo;
