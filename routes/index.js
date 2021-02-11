const express = require('express');

const router = express();
const fs = require('fs');

const handleLogin = require('./helpers/handleLogin');
const handleCreateCrush = require('./helpers/handleCreateCrush');
const handleEditCrush = require('./helpers/handleEditCrush');
const handleAuthorization = require('../middlewares/authorization/handleAuthorization');
const getAllData = require('../middlewares/dataAcess/getAllData');
const handleValidateCrushData = require('../middlewares/validations/handleValidateCrushData');
const handleDeleteCrush = require('./helpers/handleDeleteCrush');
const handleSearchCrush = require('./helpers/handleSearchCrush');

router.get('/crush', (_req, res) => {
  const file = fs.readFileSync('./crush.json', 'utf8');
  res.json(JSON.parse(file));
});

router.get(
  /\/crush\/search/, handleAuthorization, getAllData, handleSearchCrush,
);

router.get('/crush/:id', (req, res) => {
  fs.readFile('./crush.json', 'utf8', (_err, jsonData) => {
    const { id } = req.params;
    const data = JSON.parse(jsonData);
    const myCrush = data[id - 1];
    console.log(myCrush, 'crushes', id, 'id', data, 'data');
    try {
      if (myCrush.id === parseInt(id, 10)) res.status(200).json(myCrush);
    } catch (err) {
      res.json(404, { message: 'Crush não encontrado' });
    }
  });
});

router.post('/login', async (req, res) => {
  await handleLogin(req, res);
});

router.use(handleAuthorization, getAllData);

router.post('/crush', handleValidateCrushData, handleCreateCrush);

router.put('/crush/:id', handleValidateCrushData, handleEditCrush);

router.delete('/crush/:id', handleDeleteCrush);

module.exports = router;
