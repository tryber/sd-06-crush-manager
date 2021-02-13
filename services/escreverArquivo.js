const fs = require('fs').promises;

const escreverArquivo = async (caminho, conteudo) => {
  await fs.writeFile(caminho, conteudo, 'utf-8');
  return true;
};

module.exports = escreverArquivo;
