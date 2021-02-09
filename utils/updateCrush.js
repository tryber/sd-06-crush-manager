const fs = require('fs').promises;
const path = require('path');

const updateCrush = async (updatedList) => {
  await fs.writeFile(path.basename('../crush.json'), JSON.stringify(updatedList));
};

module.exports = {
  updateCrush,
};
