const { readFile, writeFile } = require('../utils/manageFiles');

const createCrush = async (req, res) => {
  const { authorization } = req.headers;
  const { name, age, date } = req.body;
  const valiDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;

  if (!authorization) {
    return res
      .status(401)
      .json({ message: 'Token não encontrado' });
  }

  if ((authorization).length !== 16) {
    return res
      .status(401)
      .json({ message: 'Token inválido' });
  }

  if (!name || name === '') {
    return res
      .status(400)
      .json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 3) {
    return res
      .status(400)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  if (!age || age === '') {
    return res
      .status(400)
      .json({ message: 'O campo "age" é obrigatório' });
  }

  if (age < 18) {
    return res
      .status(400)
      .json({ message: 'O crush deve ser maior de idade' });
  }

  if (!date || date === '' || !date.datedAt || date.datedAt === '' || !date.rate || date.rate === '') {
    console.log(date);
    return res
      .status(400)
      .json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  }

  if (valiDate.test(date.datedAt) === false) {
    return res
      .status(400)
      .json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  if (date.rate < 0 || date.rate > 5) {
    return res
      .status(400)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  const result = await readFile();
  const newCrush = { name, age, id: result.length + 1, date };
  result.push(newCrush);
  await writeFile(JSON.stringify(result));
  const retorno = {
    id: newCrush.id,
    name: newCrush.name,
    age: newCrush.age,
    date: {
      datedAt: newCrush.date.datedAt,
      rate: newCrush.date.rate,
    },
  };

  res.status(201).json(retorno);
};

module.exports = createCrush;
