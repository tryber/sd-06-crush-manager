const fs = require('fs');

const escreverArquivo = async (caminho, conteudo) => {
  await fs.writeFile(caminho, conteudo, 'utf-8');
  return true;
};

module.exports = escreverArquivo;
