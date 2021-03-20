const readFile = require('./read.js');
const write = require('./write.js');

const deleteCrush = async (req, res) => {
  const id = +req.params.id;
  const data = await readFile();
  const filt = data.filter((e) => e.id !== id);

  write(filt);

  res.status(200).send({ message: 'Crush deletado com sucesso' });
};

module.exports = deleteCrush;
