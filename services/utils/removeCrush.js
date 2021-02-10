const getCrush = require('./getCrush');
const updateCrushFile = require('./updateCrushFile');

module.exports = async (id) => {
  if (!id) throw new Error('Unexpected Error');
  const data = await getCrush();
  // ===============================
  // gambiarra para passar no teste.
  const newData = data.filter((crush) =>
    ((typeof crush.id === 'number') ? crush.id !== Number(id) : crush.id !== id));
  // ===============================
  // const newData = data.filter((crush) => crush.id !== id);
  await updateCrushFile(newData);
};
