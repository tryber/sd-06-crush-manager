const getCrush = require('./getCrush');
const updateCrushFile = require('./updateCrushFile');

module.exports = async (updatedData, id) => {
  const crushDb = await getCrush();
  // ===============================
  // gambiarra para passar no teste.
  const index = crushDb.findIndex((crush) =>
    ((typeof crush.id === 'number') ? crush.id === Number(id) : crush.id === id));
  // ===============================
  // const index = crushDb.findIndex((crush) => crush.id === id);
  const updatedCrush = { ...crushDb[index], ...updatedData };
  crushDb[index] = updatedCrush;
  await updateCrushFile(crushDb);
  return updatedCrush;
};
