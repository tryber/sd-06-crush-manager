const routes = require('express').Router();
const { readFile } = require('../utils/fileFunctions');

const main = async () => {
  const file = await (readFile('crush'));
  console.log(file);
};

main();

// routes.get('/', (req, res) => {
//   res.status(200).json({ message: 'First route testing' });
// });

routes.get('/crush', async (req, res) => {
  const file = await readFile('crush');
  res.status(200).json(JSON.parse(file));
});

module.exports = routes;
