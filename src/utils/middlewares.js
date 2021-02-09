const { readFile } = require('./manageFiles');

const readMyFile = async (req, res) => {
  const { fileName } = req.params;
  const myCrushes = await readFile(fileName);
  if (myCrushes.length > 0) {
    res.status(200).send((myCrushes));
  } else {
    res.status(200).send([]);
  }
};

module.exports = {
  readMyFile,
};
