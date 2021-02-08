const fs = require('fs');
const { getCrushes } = require('../services');

const addCrush = async (crush, crushList) => {
  const newList = [...crushList, crush];
  fs.writeFile('./crush.json', JSON.stringify(newList), (err) => {
    if (err) throw new Error(err);
    console.log('File saved');
  });
};

const createCrush = async (req, res) => {
  const crushData = await getCrushes();
  const id = crushData.length + 1;
  const newCrush = { id, ...req.body };
  addCrush(newCrush, crushData);

  res.status(201).json(newCrush);
};

module.exports = { createCrush };
