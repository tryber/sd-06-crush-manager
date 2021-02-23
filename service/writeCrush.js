const fs = require('fs').promises;
const path = require('path');

const writeCrush = async (file) => {
  await fs.writeFile(
    path.resolve(__dirname, '..', 'crush.json'),
    JSON.stringify(file),
    (err) => {
      if (err) {
        throw err;
      }
    },
  );
};

module.exports = writeCrush;
