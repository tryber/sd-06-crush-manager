const fs = require('fs');
const handleAuthorization = require('../../authorization/handleAuthorization');

const handleValidationSucessfull = async ({ parsedId }, res) => {
  const jsonData = fs.readFileSync('./crush.json', 'utf8');
  const readData = JSON.parse(jsonData);
  readData.splice(parsedId, 1);
  fs.writeFileSync('./crush.json', JSON.stringify(readData), 'utf8');
  res.status(200).json({ message: 'Crush deletado com sucesso' });
};

const handleDeleteCrush = async (req, res) => {
  const { id } = req.params;
  const { name, age, date } = req.body;
  const parsedId = parseInt(id, 10);
  const data = { parsedId, name, age, date };

  const { authorization } = req.headers;
  try {
    const auth = handleAuthorization(authorization);
    if (!auth.valid) throw new Error(auth.message);
  } catch (err) {
    res.status(401).json({ message: err.message });
    return;
  }

  try {
    handleValidationSucessfull(data, res);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
module.exports = handleDeleteCrush;
