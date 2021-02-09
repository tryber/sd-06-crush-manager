const fs = require('fs').promises;
const readFile = require('./readFile');

async function writeFile() {
  const fileData = await readFile('crush.json');
  const newCrush = {
    name: 'Keanu Reeves',
    age: 56,
    date: {
      datedAt: '22/10/2019',
      rate: 5,
    },
  };

  fileData.push(newCrush);

  await fs.writeFile('crush.json', JSON.stringify(fileData, 0, 2));
}

module.exports = writeFile;
