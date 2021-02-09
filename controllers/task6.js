// const fs = require('fs');

// const getNumberOfCrushes = () =>
//   new Promise(
//     (resolve, reject) => {
//       fs.readFile('./crush.json', (err, data) => {
//         if (err) reject(new Error('Não foi possível ler o arquivo'));
//         resolve(JSON.parse(data).length);
//       });
//     },
//   );

const checkToken = (token) => {
  let msg = 'ok';
  if (!token) {
    msg = 'Token não encontrado';
  } else if (token.length !== 16) {
    msg = 'Token inválido';
  }
  return msg;
};

const deleteCrush = (req, res) => {
  const token = req.headers.authorization;
  // const id = parseInt(req.params.id, 10);
  const msgToken = checkToken(token);

  if (msgToken !== 'ok') {
    res.status(401).send({ message: msgToken });
  } else {
    // getNumberOfCrushes()
    // .then((r) => {
    const resBody = { message: 'Crush deletado com sucesso' };
    res.status(200).send(resBody);
    // });
  }
};

module.exports = deleteCrush;
