const fs = require('fs');
const { schema } = require('../../schemas/index');
const handleAuthorization = require('../../authorization/handleAuthorization');
const validateDate = require('../../validations/validateDate');

const handleValidationSucessfull = async ({ parsedId, ...rest }, res) => {
  const jsonData = fs.readFileSync('./crush.json', 'utf8');
  const readData = JSON.parse(jsonData);
  let el = readData.filter((crush) => crush.id === parsedId)[0];
  el = { parsedId, ...rest };
  readData[el.parsedId - 1] = el;
  fs.writeFileSync('./crush.json', JSON.stringify(readData), 'utf8');
  res.status(200).json({ id: parsedId, ...rest });
};

const handleEditCrush = async (req, res) => {
  const { id } = req.params;
  const { name, age, date } = req.body;
  const parsedId = parseInt(id, 10);
  const jsonData = fs.readFileSync('./crush.json', 'utf8');
  const readData = JSON.parse(jsonData);
  const isValidId = readData.find((crush) => crush.id === parsedId);
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
    if (!isValidId) throw new Error('pagina nao existe');
  } catch (err) {
    res.status(404).json({ message: err.message });
  }

  try {
    const validatedDate = validateDate(req.body.date);
    if (!validatedDate.valid) throw new Error(validatedDate.message);
    await schema.validate({ name, age, date });
    handleValidationSucessfull(data, res);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
module.exports = handleEditCrush;
