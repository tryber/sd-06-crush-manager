const { getData } = require('./getData');

const getAllCrush = async (req, res) => {
  const response = await getData();
  res.send(response);
};

module.exports = { getAllCrush };
