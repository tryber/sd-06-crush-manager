const fs = require('fs');

const handleValidationSucessfull = (req, res) => {
  const { body } = req;
  const { readData } = res.locals;

  const id = readData.length + 1;
  console.log(id);
  readData.push({ ...body, id });
  fs.writeFileSync('./crush.json', JSON.stringify(readData), 'utf8');
  res.status(201).json({ ...body, id });
};

async function handleCreateCrush(req, res) {
  // try {
  handleValidationSucessfull(req, res);
}

module.exports = handleCreateCrush;
