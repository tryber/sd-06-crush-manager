const fs = require('fs').promises;
const { pegandoCrushs } = require('../servicos');

const adicionandoCrush = async (crush, crushList) => {
  const newList = [...crushList, crush];
  fs.writeFile('./crush.json', JSON.stringify(newList), (err) => {
    if (err) throw new Error(err);
    console.log('File Saved');
  });
};

const criandoCrush = async (req, res) => {
  const crushData = await pegandoCrushs();
  const id = crushData.length + 1;
  const novoCrush = { id, ...req.body };
  adicionandoCrush(novoCrush, crushData);
  res.status(201).json(novoCrush);
};

module.exports = { criandoCrush };
