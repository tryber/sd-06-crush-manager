const express = require('express');

const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

const readCrushJson = async () => {
  const content = await fs.readFile(path.resolve(__dirname, '.', 'crush.json'));
  return JSON.parse(content.toString('utf-8'));
};

router.get('/', async (_req, res) => {
  const crushList = await readCrushJson();
  console.log('crush', crushList);
  if (!crushList) return res.status(200).send([]);
  res.status(200).send(crushList);
});

module.exports = router;
