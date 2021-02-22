const fs = require('fs').promises;
const { getData } = require('./getData');

const addCrush = async (crush, crushList) => {
  const newData = JSON.stringify([...crushList, crush]);
  fs.writeFile('./crush.json', newData, (err) => {
    if (err) throw new Error(err);
  });
};

const createCrush = async (req, res) => {
  const crushData = await getData();
  const id = crushData.length + 1;
  const newCrush = { id, ...req.body };
  addCrush(newCrush, JSON.parse(crushData));
  res.status(201).json(newCrush);
};

module.exports = { createCrush };
