const fs = require('fs').promises;
const path = require('path');

const readCrushFile = async () => {
  const content = await fs.readFile(path.resolve(__dirname, '.', 'crush.json'));
  return JSON.parse(content.toString('utf-8'));
};

module.exports = {
  async readCrush(_request, response) {
    const file = await readCrushFile();

    if (!file) {
      return response.status(200).json([]);
    }

    // console.log(file)

    return response.status(200).json(file);
  },

  // async crushID(request, response) {
  // },

  // async search(request, response) {
  // },

};
