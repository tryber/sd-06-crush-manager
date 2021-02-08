const fs = require('fs').promises;
const path = require('path');

const readerFileCrush = async () => {
  const content = await fs.readFile(path.resolve(__dirname, '..', 'crush.json'));
  return JSON.parse(content.toString('utf-8'));
};

module.exports = {
  async crushRead(_request, response) {
    const file = await readerFileCrush();
    console.log(file);
    return response.status(200).json(file);
  },
};
