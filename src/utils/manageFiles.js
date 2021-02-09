const fs = require('fs').promises;
const path = require('path');

const readCrushs = async (fileName) => {
  const content = await fs.readFile(path.resolve(__dirname, '.', `${fileName}`));

  return JSON.parse(content.toString('utf8'));
};

const writeCrushFile = async (fileName, content) => (
  fs.writeFile(
    path.resolve(__dirname, '.', `${fileName}`),
    JSON.stringify(content),
    (err) => {
      if (err) throw err;
    },
  )
);

module.exports = {
  readCrushs,
  writeCrushFile,
};
