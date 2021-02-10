const fs = require('fs');
const path = require('path');
const { readCrushFile } = require('./readCrushFile');

const writeCrushInFile = (crushFile) => {
  fs.writeFileSync(
    path.join(__dirname, '..', 'crush.json'),
    JSON.stringify(crushFile), 'utf8',
  );
};

const writeNewCrush = async ({ crushBody }) => {
  const crushFile = await readCrushFile();
  const crushParsed = JSON.parse(crushFile);

  const newCrush = {
    id: crushParsed.length + 1,
    ...crushBody,
  };

  crushParsed.push(newCrush);
  writeCrushInFile(crushParsed);

  return newCrush;
};

module.exports = {
  writeNewCrush,
  writeCrushInFile,
};
