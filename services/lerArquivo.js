const fs = require('fs');

const lerArquivo = (caminho) => new Promise((resolve, reject) => {
  fs.readFile(caminho, 'utf-8', (err, data) => {
    if (err) return reject(new Error(`${err.message}`));
    resolve(data);
  });
});

/* const main = async () => {
  const testando = await lerArquivo
  ('/home/labelle/Documentos/trybe/Back-End/Bloco_26/sd-06-crush-manager/crush.json');
  console.log(testando);
};

main(); */

module.exports = lerArquivo;
