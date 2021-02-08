const fs = require('fs').promises;
const path = require('path');

const writeNewCrush = async (currentList, newCrush) => {
  const newList = [...currentList, newCrush];
  await fs.writeFile(path.basename('../crush.json'), JSON.stringify(newList));
};

module.exports = {
  writeNewCrush,
};
