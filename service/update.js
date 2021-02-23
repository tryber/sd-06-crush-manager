const readCrush = require('./crush');
const writeCrush = require('./deleta');

const updatecrushs = async (name, age, id, date) => {
  const todosCrushs = await readCrush();
  const filtraCrush = todosCrushs.filter((item) => item.id !== id);
  filtraCrush.push({ name, age, id, date });
  await writeCrush(filtraCrush);
};

module.exports = updatecrushs;
