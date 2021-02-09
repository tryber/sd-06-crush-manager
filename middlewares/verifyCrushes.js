const fs = require('fs').promises;

const verifyCrushes = async (_req, res) => {
  const crushes = JSON.parse(
    await fs.readFile('crush.json', 'UTF-8', (err, data) => {
      if (err) {
        return err;
      }
      return data;
    }),
  );
  return crushes ? res.status(200).json(crushes) : res.status(200).json([]);
};

module.exports = { verifyCrushes };
// const verifyCrushes = async (_req, res) => {
//   const crushes = await readFile('./crush');
//   try {
//     res.status(200).json(JSON.parse(crushes));
//   } catch (err) {
//     console.error(err);
//     res.status(200).json([]);
//   }
// };
