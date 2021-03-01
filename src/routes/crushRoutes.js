const express = require('express');

const router = express.Router();

const validate = require('../auth/validate');

const allCrushs = require('../controllers/CrashAll');
const searchCrushById = require('../controllers/CrashById');
const crashToken = require('../controllers/CrashToken');
const addNewCrush = require('../controllers/CrashAdd');
const updateCrush = require('../controllers/CrashUpdate');
const deleteCrush = require('../controllers/CrashDelete');
const filterCrush = require('../controllers/CrashFilter');

router.get('/crush', allCrushs);
router.get('/crush/search?', filterCrush);
router.get('/crush/:id', searchCrushById);
router.post('/login', crashToken);
router.post('/crush', validate, addNewCrush);
router.put('/crush/:id', validate, updateCrush);
router.delete('/crush/:id', deleteCrush);

module.exports = router;
