const readCrushFile = require('./readCrushFile');

module.exports = async (id) => {
  const data = JSON.parse(await readCrushFile());
  if (id === 'all') return data;
  return data.find((crush) => crush.id === Number(id));
};
