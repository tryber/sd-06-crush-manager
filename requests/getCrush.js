const fs = require('fs').promises;
const path = require('path');
// const { readerFile, writerFile } = require('../utils/managerFiles');

const readerFileCrush = async () => {
  const content = await fs.readFile(path.resolve(__dirname, '..', 'crush.json'));
  return JSON.parse(content.toString('utf-8'));
};

module.exports = {
  async crushesRead(_request, response) {
    const file = await readerFileCrush();
    return response.status(200).json(file);
  },
};
