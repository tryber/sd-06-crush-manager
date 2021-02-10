const fs = require('fs');

const lerArquivo = (caminho) => new Promise((resolve, reject) => {
  fs.readFile(caminho, 'utf-8', (err, data) => {
    if (err) return reject(new Error(`${err.message}`));
    resolve(data);
  });
});

module.exports = lerArquivo;
