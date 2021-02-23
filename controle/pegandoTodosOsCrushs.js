const fs = require('fs');

const pegandoTodosOsCrushs = async () => {
  const listaDeCrush = await fs.readFileSync('./crush.json', 'utf8', (err) => {
    if (err) throw new Error(err);
  });
  return JSON.parse(listaDeCrush);
};

module.exports = { pegandoTodosOsCrushs };
