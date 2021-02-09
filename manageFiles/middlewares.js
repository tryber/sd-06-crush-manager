const { readFile } = require('./manageFiles');

const readMyFile = async (req, res) => {
  const { fileName } = req.params;
  const myCrushes = await readFile(fileName);
  if (myCrushes.length > 0) {
    res.status(200).json((myCrushes));
  } else {
    res.status(200).json([]);
  }
};

const getCrushByID = async (req, res, next) => {
  const { fileName, id } = req.params;
  const myCrushes = await readFile(fileName);
  const myCrush = myCrushes.find((crush) => crush.id === parseInt(id, 10));

  // console.log(myCrush);

  if (myCrush) {
    res.status(200).json(myCrush);
  } else {
    next({ message: 'Crush não encontrado', statusCode: 404 });
  }
};

const error = ((err, _req, res, _next) => {
  res.status(err.statusCode || 500).json({ message: err.message });
});

module.exports = {
  readMyFile,
  getCrushByID,
  error,
};
