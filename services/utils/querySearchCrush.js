const getCrush = require('./getCrush');

module.exports = async (query) => {
  const crushDb = await getCrush();
  if (!query) return crushDb;
  return crushDb.filter((crush) => crush.name.includes(query));
};
