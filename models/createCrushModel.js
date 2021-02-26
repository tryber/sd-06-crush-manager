const { readFile, writeFile } = require('../utils/manageFiles');

const createCrush = async (name, age, date) => {
  const result = await readFile();
  const newCrush = { name, age, id: result.length + 1, date };

  result.push(newCrush);
  await writeFile(JSON.stringify(result));

  return {
    id: newCrush.id,
    name: newCrush.name,
    age: newCrush.age,
    date: {
      datedAt: newCrush.date.datedAt,
      rate: newCrush.date.rate,
    },
  };
};

module.exports = { createCrush };
