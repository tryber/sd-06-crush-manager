const readCrush = require('./crush');

const deleteId = async (id) => {
  const crushs = await readCrush();
  const deletaId = crushs.find((crush) => crush.id === Number(id));
  if (!deletaId) return false;

  return crushs.filter((crush) => crush.id !== Number(id));
};

module.exports = deleteId;
