const fs = require('fs').promises;
const path = require('path');

const readCrushFile = async () => {
  const content = await fs.readFile(path.resolve(__dirname, '.', 'crush.json'));
  return JSON.parse(content.toString('utf-8'));
};

module.exports = {
  async edit(request, response) {

  },
};
