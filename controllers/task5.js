const fs = require('fs');

const getCrushes = () => new Promise(
  (resolve, reject) => {
    fs.readFile('./crush.json', (err, data) => {
      if (err) reject(new Error('Não foi possível ler o arquivo'));
      resolve(JSON.parse(data));
    });
  },
);

const updateCrush = (id, bodyData) => new Promise(
  (resolve, reject) => {
    getCrushes()
      .then((r) => {
        const crushes = r;
        let indexOfCrush;
        r.map((crush, index) => {
          if (crush.id === id) indexOfCrush = index;
          return '';
        });
        crushes[indexOfCrush] = { ...bodyData, id };
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

const checkName = (name) => {
  let msg = 'ok';
  if (name === '' || name === undefined) {
    msg = 'O campo "name" é obrigatório';
  } else if (name.length < 3) {
    msg = 'O "name" deve ter pelo menos 3 caracteres';
  }
  return msg;
};

const checkAge = (age) => {
  let msg = 'ok';
  if (age === null || age === undefined) {
    msg = 'O campo "age" é obrigatório';
  } else if (age < 18) {
    msg = 'O crush deve ser maior de idade';
  }
  return msg;
};

const checkDate = (date) => {
  let msg = 'ok';
  const regEx = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]|(?:Jan|Mar|May|Jul|Aug|Oct|Dec)))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2]|(?:Jan|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)(?:0?2|(?:Feb))\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9]|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep))|(?:1[0-2]|(?:Oct|Nov|Dec)))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;

  if (date === undefined || date === null
    || date.rate === undefined || date.datedAt === undefined) {
    msg = 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios';
  } else if (!regEx.test(date.datedAt)) {
    msg = 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"';
  } else if (date.rate < 1 || date.rate > 5) {
    msg = 'O campo "rate" deve ser um inteiro de 1 à 5';
  }
  return msg;
};

const putCrush = (req, res) => {
  const token = req.headers.authorization;
  const id = parseInt(req.params.id, 10);
  const { name, age, date } = req.body;

  const msgToken = checkToken(token);
  const msgName = checkName(name);
  const msgAge = checkAge(age);
  const msgDate = checkDate(date);

  if (msgName !== 'ok') {
    res.status(400).send({ message: msgName });
  } else if (msgToken !== 'ok') {
    res.status(401).send({ message: msgToken });
  } else if (msgAge !== 'ok') {
    res.status(400).send({ message: msgAge });
  } else if (msgDate !== 'ok') {
    res.status(400).send({ message: msgDate });
  } else {
    updateCrush(id, req.body)
      .then((response) => {
        if (response !== undefined) {
          res.status(200).send(response);
        } else {
          res.status(404).send({ message: 'Não foi possível atualizar o crush' });
        }
      })
      .catch((error) => res.status(400).send(error));
  }
};

module.exports = putCrush;
