const fs = require('fs').promises;
const path = require('path');

const writeCrushList = async (currentList, newCrush) => {
  const newList = [...currentList, newCrush];
  await fs.writeFile(path.basename('../crush.json'), JSON.stringify(newList)).catch((error) => console.error(error.message));
};

module.exports = {
  writeCrushList,
};
