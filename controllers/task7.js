const fs = require('fs');

const getCrushes = () => new Promise(
  (resolve, reject) => {
    fs.readFile('./crush.json', (err, data) => {
      if (err) reject(new Error('Não foi possível ler o arquivo'));
      resolve(JSON.parse(data));
    });
  },
);

const searchInCrushes = (term) => new Promise(
  (resolve, reject) => {
    getCrushes()
      .then((r) => {
        const regEx = new RegExp(`${term}`);
        const crushes = r.filter((crush) => regEx.test(crush.name));
        console.log(crushes);
        resolve(crushes);
      })
      .catch((error) => reject(error));
  },
);

const checkToken = (token) => {
  let msg = 'ok';
  if (!token) {
    msg = 'Token não encontrado';
  } else if (token.length !== 16) {
    msg = 'Token inválido';
  }
  return msg;
};

const search = (req, res) => {
  const token = req.headers.authorization;
  const term = req.query.q;

  const msgToken = checkToken(token);

  if (msgToken !== 'ok') {
    res.status(401).send({ message: msgToken });
  } else {
    searchInCrushes(term)
      .then((response) => res.status(200).send(response))
      .catch((error) => res.status(400).send(error));
  }
};

module.exports = search;
