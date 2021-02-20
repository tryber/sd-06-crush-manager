const fs = require('fs');
const crush = require('./crush.json');

// function readFilePromise() {
//   return new Promise((resolve, reject) => {
//     fs.readFile(crushData, (err, content) => {
//       if (err) return reject(err);
//       console.log(content);
//       resolve(content);
//     });
//   });
// }

// module.exports = {
//   readFilePromise,
// };

fs.readFile(crush, 'utf8', (err, data) => {
  if (err) {
    console.error(`Não foi possível ler o arquivo ${crush}\n Erro: ${err}`);
    process.exit(1);
  }
  console.log(data);
});
