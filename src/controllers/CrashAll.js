const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const router = express.Router();

const crushs = '../../crush.json';

const readCrushs = async () => {
  const content = await fs.readFile(path.resolve(__dirname, '.', crushs));

  return JSON.parse(content.toString('utf8'));
};

router.get('/crush', async (_req, res) => {
  const contentCrushs = await readCrushs();

  console.log(contentCrushs);

  if (contentCrushs.length === 0) {
    return res.status(200).send([]);
  }
  return res.status(200).send(contentCrushs);
});

module.exports = router;
