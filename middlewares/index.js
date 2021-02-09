const fs = require('fs').promises;
const path = require('path').resolve;

const { SUCCESS } = require('../index');

const getCrushes = async (_req, res) => {
  const data = await fs.readFile(`${path()}/crush.json`, 'utf-8');
  res.status(SUCCESS).send(data);
};

module.exports = {
  getCrushes,
};
