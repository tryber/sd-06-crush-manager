const fs = require('fs');

const getCrushes = () => new Promise(
  (resolve, reject) => {
    fs.readFile('./crush.json', (err, data) => {
      if (err) reject(new Error('Não foi possível ler o arquivo'));
      resolve(JSON.parse(data));
    });
  },
);

const removeCrush = (id) => new Promise(
  (resolve, reject) => {
    getCrushes()
      .then((r) => {
        let crushes = r;
        let indexOfCrush;
        r.map((crush, index) => {
          if (crush.id === id) indexOfCrush = index;
          return '';
        });
        crushes = [...crushes.slice(0, indexOfCrush), ...crushes.slice(indexOfCrush + 1)];
        fs.writeFile('./crush.json', JSON.stringify(crushes), (err) => {
          if (err) reject(new Error('Não foi possível atualizar o crush na base de dados'));
        });
      })
      .then(() => {
        getCrushes()
          .then((r) => {
            const updatedCrush = r.find((c) => c.id === id);
            resolve(updatedCrush);
          })
          .catch((error) => reject(error));
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

const deleteCrush = (req, res) => {
  const token = req.headers.authorization;
  const id = parseInt(req.params.id, 10);

  const msgToken = checkToken(token);

  if (msgToken !== 'ok') {
    res.status(401).send({ message: msgToken });
  } else {
    removeCrush(id)
      .then((response) => {
        if (response === undefined) {
          const msg = { message: 'Crush deletado com sucesso' };
          res.status(200).send(msg);
        } else {
          res.status(404).send({ message: 'Não foi possível deletar o crush' });
        }
      })
      .catch((error) => res.status(400).send(error));
  }
};

module.exports = deleteCrush;
