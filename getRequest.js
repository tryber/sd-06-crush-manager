const fs = require('fs').promises;
const path = require('path');

const readCrushFile = async () => {
  const content = await fs.readFile(path.resolve(__dirname, '.', 'crush.json'));
  return JSON.parse(content.toString('utf-8'));
};

module.exports = {
  async readCrush(_request, response) {
    const file = await readCrushFile();

    // console.log(file)

    return response.status(200).json(file);
  },

  async crushID(request, response) {
    const file = await readCrushFile();

    const id = Number(request.params.id);

    // console.log(typeof id)

    const filteredCrush = file.find((crush) => crush.id === id);

    if (!filteredCrush) return response.status(404).json({ message: 'Crush não encontrado' });

    return response.status(200).send(filteredCrush);
  },

};
