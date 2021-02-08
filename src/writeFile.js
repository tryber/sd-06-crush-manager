const fs = require('fs/promises');
const path = require('path').resolve;

const writeCrushJson = async (content) => {
  await fs.writeFile(path(__dirname, '.', 'files', 'crush.json'), content, 'utf-8');
  return content;
};
