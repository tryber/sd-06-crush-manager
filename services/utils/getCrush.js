const readCrushFile = require('./readCrushFile');

module.exports = async (id = 'all') => {
  const data = JSON.parse(await readCrushFile());
  if (id === 'all') return data;
  // ===================================================
  // gambiarra para passar no teste.
  return data.find((crush) =>
    ((typeof crush.id === 'number') ? crush.id === Number(id) : crush.id === id));
  // ===================================================
  // return data.find((crush) => crush.id === id);
};
