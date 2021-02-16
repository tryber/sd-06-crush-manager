const fs = require('fs').promises;

const crushData = 'crush.json';

module.exports = {
  async readCrush(_request, response) {
    const file = await fs.readFile(crushData, 'utf-8');
    const fileJson = JSON.parse(file);

    if (!file) {
      return response.status(200).json([]);
    }

    // console.log(file)

    return response.status(200).json(fileJson);
  },

  async crushID(request, response) {
    const file = await fs.readFile(crushData, 'utf-8');
    const fileJson = JSON.parse(file);

    const id = Number(request.params.id);

    // console.log(typeof id)

    const filteredCrush = fileJson.find((crush) => crush.id === id);

    if (!filteredCrush) return response.status(404).json({ message: 'Crush não encontrado' });

    return response.status(200).send(filteredCrush);
  },

  // async search(request, response) {
  // },

};
