const fs = require('fs');

const crushFile = './crush.json';

async function readCrushFile() {
  return fs.readFileSync(crushFile, 'utf8');
}

const getAllCrushs = async () => {
  try {
    const crushData = await readCrushFile();
    return JSON.parse(crushData);
  } catch (err) {
    return undefined;
  }
};

module.exports = {
  getAllCrushs,
  readCrushFile,
};
