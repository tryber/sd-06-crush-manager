const fs = require('fs').promises;

function readCrushes() {
  const crushes = fs.readFile('crush.json', 'utf8', (err, data) => {
    if (!err) {
      return data;
    }
    return process.exit(1);
  });

  return crushes;
}

const parsedData = async () => {
  const data = await readCrushes();
  return JSON.parse(data);
};

module.exports = parsedData;
