const { readFile } = require('./manageFiles');

const readMyFile = async (req, res) => {
  const { fileName } = req.params;
  const myCrushes = await readFile(fileName);
  res.status(200).json((myCrushes));
};

module.exports = {
  readMyFile,
};
