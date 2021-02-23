const { readFile, writeFile } = require('../utils/manageFiles');

const createCrush = async (req, res) => {
  const { name, age, date } = req.body;

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
