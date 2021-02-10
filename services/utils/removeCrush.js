const getCrush = require('./getCrush');

module.exports = async (id) => {
  const data = await getCrush();
  // ===============================
  // gambiarra para passar no teste.
  return data.filter((crush) =>
    ((typeof crush.id === 'number') ? crush.id === Number(id) : crush.id === id));
  // ===============================
  // return data.filter((crush) => crush.id !== id);
};
