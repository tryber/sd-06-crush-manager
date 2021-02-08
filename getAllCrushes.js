const { getData } = require('./getData');

const getAllCrush = async (req, res) => {
  const response = await getData();
  res.send(JSON.parse(response));
};

module.exports = getAllCrush;
