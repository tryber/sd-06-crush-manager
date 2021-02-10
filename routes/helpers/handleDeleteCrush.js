const fs = require('fs');

const handleValidationSucessfull = async (req, res) => {
  const { body } = req;
  const { id } = body;
  const { readData } = res.locals;
  readData.splice(id, 1);
  fs.writeFileSync('./crush.json', JSON.stringify(readData), 'utf8');
  res.status(200).json({ message: 'Crush deletado com sucesso' });
};

const handleDeleteCrush = async (req, res) => {
  try {
    handleValidationSucessfull(req, res);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
module.exports = handleDeleteCrush;
