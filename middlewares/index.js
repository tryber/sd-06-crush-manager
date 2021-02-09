const fs = require('fs').promises;
const path = require('path').resolve;

// const { SUCCESS } = require('../index');

const getCrushes = async (_req, res) => {
  const data = await fs.readFile(`${path()}/crush.json`, 'utf-8');
  const allCrushes = JSON.parse(data);
  res.status(200).send(allCrushes);
};

const getCrush = (req, res) => {
  const { id } = req.params;
  console.log(id);
  res.status(200);
};

module.exports = {
  getCrushes,
  getCrush,
};
