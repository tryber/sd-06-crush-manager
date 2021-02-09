const express = require('express');

const router = express();
const fs = require('fs');

const handleLogin = require('./helpers/handleLogin');

router.get('/crush', (_req, res) => {
  const file = fs.readFileSync('./crush.json', 'utf8');
  res.json(JSON.parse(file));
});

router.get('/crush/:id', (req, res) => {
  fs.readFile('./crush.json', 'utf8', (_err, jsonData) => {
    const { id } = req.params;
    const data = JSON.parse(jsonData);
    const myCrush = data[id - 1];
    console.log(myCrush, 'crushes', id, 'id', data, 'data');
    try {
      if (myCrush.id == id) res.status(200).json(myCrush);
    } catch (err) {
      res.json(404, { message: 'Crush não encontrado' });
    }
  });
});

router.post('/login', async (req, res) => {
  await handleLogin(req, res);
});

module.exports = router;
