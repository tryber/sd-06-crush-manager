const fs = require('fs').promises;

module.exports = async (_req, res) => {
  const crushes = JSON.parse(
    await fs.readFile('crush.json', 'UTF-8', (err, data) => {
      if (err) {
        return console.log(err);
      }
      return data;
    }),
  );
  return crushes ? res.status(200).json(crushes) : res.status(200).json([]);
};
